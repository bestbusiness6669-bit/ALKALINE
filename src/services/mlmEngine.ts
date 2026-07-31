import { User, ActivationPin, Transaction, SystemSettings, GenealogyTreeNode } from '../types';

export class MlmEngineService {
  /**
   * Calculates binary pair income for a user given left volume and right volume.
   * Pair ratio: 1:1
   * Pair payout: ₹600 per pair
   * Daily ceiling: 10 pairs max (₹6,000 max pair income per day)
   */
  static processPairMatching(
    user: User,
    settings: SystemSettings
  ): {
    newPairs: number;
    pairIncome: number;
    newLeftCarry: number;
    newRightCarry: number;
    cappedOut: boolean;
    actualIncomeAdded: number;
  } {
    if (user.status !== 'ACTIVE') {
      return {
        newPairs: 0,
        pairIncome: 0,
        newLeftCarry: user.leftCarryForward,
        newRightCarry: user.rightCarryForward,
        cappedOut: user.status === 'CAPPED_INACTIVE',
        actualIncomeAdded: 0,
      };
    }

    // 1 unit = 1 package of ₹6,300
    const leftUnits = Math.floor(user.leftCarryForward / settings.packagePrice);
    const rightUnits = Math.floor(user.rightCarryForward / settings.packagePrice);

    let matchablePairs = Math.min(leftUnits, rightUnits);
    if (matchablePairs <= 0) {
      return {
        newPairs: 0,
        pairIncome: 0,
        newLeftCarry: user.leftCarryForward,
        newRightCarry: user.rightCarryForward,
        cappedOut: false,
        actualIncomeAdded: 0,
      };
    }

    // Apply daily ceiling limit (10 pairs per day)
    const availablePairQuota = Math.max(0, settings.dailyPairCeiling - user.todayPairs);
    const pairsToPay = Math.min(matchablePairs, availablePairQuota);

    const grossPairIncome = pairsToPay * settings.pairIncome;

    // Remaining volume carry forward calculation
    const matchedVolume = matchablePairs * settings.packagePrice;
    const newLeftCarry = user.leftCarryForward - matchedVolume;
    const newRightCarry = user.rightCarryForward - matchedVolume;

    // Check 3X cap limit
    const currentEarnings = user.totalEarnings;
    const maxEarnings = user.packagePrice * settings.capMultiplier;
    const headroom = Math.max(0, maxEarnings - currentEarnings);

    let actualIncomeAdded = grossPairIncome;
    let cappedOut = false;

    if (grossPairIncome >= headroom) {
      actualIncomeAdded = headroom;
      cappedOut = true;
    }

    return {
      newPairs: pairsToPay,
      pairIncome: grossPairIncome,
      newLeftCarry,
      newRightCarry,
      cappedOut,
      actualIncomeAdded,
    };
  }

  /**
   * Calculates daily ROI income for active users.
   * 0.5% daily on ₹6,300 = ₹31.50 / day.
   * Runs Monday to Friday only.
   */
  static processDailyRoi(
    user: User,
    settings: SystemSettings,
    date: Date = new Date()
  ): {
    roiAmount: number;
    isWeekend: boolean;
    cappedOut: boolean;
    actualIncomeAdded: number;
  } {
    const dayOfWeek = date.getDay(); // 0 = Sun, 6 = Sat
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return {
        roiAmount: 0,
        isWeekend: true,
        cappedOut: false,
        actualIncomeAdded: 0,
      };
    }

    if (user.status !== 'ACTIVE') {
      return {
        roiAmount: 0,
        isWeekend: false,
        cappedOut: user.status === 'CAPPED_INACTIVE',
        actualIncomeAdded: 0,
      };
    }

    const grossRoi = (user.packagePrice * settings.dailyRoiPercentage) / 100; // 31.50
    const maxEarnings = user.packagePrice * settings.capMultiplier;
    const headroom = Math.max(0, maxEarnings - user.totalEarnings);

    let actualIncomeAdded = grossRoi;
    let cappedOut = false;

    if (grossRoi >= headroom) {
      actualIncomeAdded = headroom;
      cappedOut = true;
    }

    return {
      roiAmount: grossRoi,
      isWeekend: false,
      cappedOut,
      actualIncomeAdded,
    };
  }

  /**
   * Builds visual binary tree structure recursively starting from a root user ID.
   */
  static buildGenealogyTree(
    rootId: string,
    allUsers: User[]
  ): GenealogyTreeNode | null {
    const userMap = new Map<string, User>();
    allUsers.forEach((u) => userMap.set(u.id, u));

    const rootUser = userMap.get(rootId);
    if (!rootUser) return null;

    const findChild = (parentId: string, leg: 'LEFT' | 'RIGHT'): User | undefined => {
      return allUsers.find((u) => u.parentId === parentId && u.placement === leg);
    };

    const buildNode = (user: User): GenealogyTreeNode => {
      const leftChild = findChild(user.id, 'LEFT');
      const rightChild = findChild(user.id, 'RIGHT');

      return {
        user,
        left: leftChild ? buildNode(leftChild) : null,
        right: rightChild ? buildNode(rightChild) : null,
      };
    };

    return buildNode(rootUser);
  }

  /**
   * Recursively calculates business volume & downline count on Left & Right legs.
   */
  static recalculateUserTreeVolumes(users: User[]): User[] {
    const updatedUsers = [...users];
    const userMap = new Map<string, User>();
    updatedUsers.forEach((u) => userMap.set(u.id, u));

    const getLegStats = (
      parentId: string,
      leg: 'LEFT' | 'RIGHT'
    ): { count: number; volume: number } => {
      const directChild = updatedUsers.find(
        (u) => u.parentId === parentId && u.placement === leg
      );

      if (!directChild) return { count: 0, volume: 0 };

      let count = 1;
      let volume = directChild.status === 'ACTIVE' ? directChild.packagePrice : 0;

      const leftStats = getLegStats(directChild.id, 'LEFT');
      const rightStats = getLegStats(directChild.id, 'RIGHT');

      count += leftStats.count + rightStats.count;
      volume += leftStats.volume + rightStats.volume;

      return { count, volume };
    };

    return updatedUsers.map((user) => {
      const leftStats = getLegStats(user.id, 'LEFT');
      const rightStats = getLegStats(user.id, 'RIGHT');

      return {
        ...user,
        leftCount: leftStats.count,
        rightCount: rightStats.count,
        leftBusiness: leftStats.volume,
        rightBusiness: rightStats.volume,
      };
    });
  }

  /**
   * Batch run daily ROI payout for all active users
   */
  static calculateDailyRoi(
    users: User[],
    settings: SystemSettings
  ): { updatedUsers: User[]; transactions: Transaction[] } {
    const transactions: Transaction[] = [];
    const updatedUsers = users.map((user) => {
      if (user.status !== 'ACTIVE') return user;
      const res = this.processDailyRoi(user, settings);
      if (res.actualIncomeAdded > 0) {
        const newTotal = user.totalEarnings + res.actualIncomeAdded;
        const capped = res.cappedOut;

        const txn: Transaction = {
          id: `TXN-ROI-${Math.floor(10000 + Math.random() * 90000)}`,
          userId: user.id,
          userName: user.name,
          type: 'ROI',
          amount: res.actualIncomeAdded,
          description: `Daily ROI Payout (0.5% of ₹${user.packagePrice})`,
          status: 'SUCCESS',
          createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
        };
        transactions.push(txn);

        const updatedUser: User = {
          ...user,
          incomeWallet: user.incomeWallet + res.actualIncomeAdded,
          roiIncome: user.roiIncome + res.actualIncomeAdded,
          totalEarnings: newTotal,
          status: capped ? 'CAPPED_INACTIVE' : user.status,
        };
        return updatedUser;
      }
      return user;
    });

    return { updatedUsers, transactions };
  }

  /**
   * Batch run binary pair matching for all active users
   */
  static calculateBinaryPairMatching(
    users: User[],
    settings: SystemSettings
  ): { updatedUsers: User[]; transactions: Transaction[] } {
    const transactions: Transaction[] = [];
    const updatedUsers = users.map((user) => {
      if (user.status !== 'ACTIVE') return user;
      const res = this.processPairMatching(user, settings);
      if (res.actualIncomeAdded > 0) {
        const newTotal = user.totalEarnings + res.actualIncomeAdded;
        const capped = res.cappedOut;

        const txn: Transaction = {
          id: `TXN-PAIR-${Math.floor(10000 + Math.random() * 90000)}`,
          userId: user.id,
          userName: user.name,
          type: 'BINARY_PAIR',
          amount: res.actualIncomeAdded,
          description: `Binary Pair Payout (${res.newPairs} pairs @ ₹${settings.pairIncome})`,
          status: 'SUCCESS',
          createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
        };
        transactions.push(txn);

        const updatedUser: User = {
          ...user,
          incomeWallet: user.incomeWallet + res.actualIncomeAdded,
          binaryIncome: user.binaryIncome + res.actualIncomeAdded,
          totalEarnings: newTotal,
          leftCarryForward: res.newLeftCarry,
          rightCarryForward: res.newRightCarry,
          todayPairs: user.todayPairs + res.newPairs,
          lifetimePairs: user.lifetimePairs + res.newPairs,
          status: capped ? 'CAPPED_INACTIVE' : user.status,
        };
        return updatedUser;
      }
      return user;
    });

    return { updatedUsers, transactions };
  }
}
