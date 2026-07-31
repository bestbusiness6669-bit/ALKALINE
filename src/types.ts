/**
 * WEALTH VEDA - Core Direct Selling MLM Type Definitions
 */

export type UserRole = 'USER' | 'ADMIN';

export type UserStatus = 'INACTIVE' | 'ACTIVE' | 'CAPPED_INACTIVE' | 'BLOCKED';

export type PlacementLeg = 'LEFT' | 'RIGHT';

export interface User {
  id: string; // e.g., "WV100001"
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  sponsorId?: string; // ID of sponsor who referred this user
  parentId?: string; // ID of binary tree parent
  placement?: PlacementLeg; // Left or Right leg of parent
  packageId?: string;
  packageName?: string;
  packagePrice: number; // ₹6300
  activationDate?: string;
  activationPinUsed?: string;
  
  // Wallet Balances
  incomeWallet: number; // Available earnings
  withdrawWallet: number; // Total withdrawn
  totalEarnings: number; // Total earnings across ROI, Referral, Pair
  earningsCap: number; // 3X package = ₹18,900
  
  // Specific Income Totals
  roiIncome: number;
  referralIncome: number;
  binaryIncome: number;
  
  // Binary Business Stats
  leftCount: number;
  rightCount: number;
  leftBusiness: number; // total left volume in ₹
  rightBusiness: number; // total right volume in ₹
  leftCarryForward: number;
  rightCarryForward: number;
  todayPairs: number;
  lifetimePairs: number;
  
  // KYC Info
  kycStatus: 'NOT_SUBMITTED' | 'PENDING' | 'APPROVED' | 'REJECTED';
  aadhaarNumber?: string;
  panNumber?: string;
  aadhaarImage?: string;
  panImage?: string;
  profilePhoto?: string;
  
  // Bank Details
  bankName?: string;
  accountNumber?: string;
  ifscCode?: string;
  branchName?: string;
  upiId?: string;
  
  createdAt: string;
}

export interface ActivationPin {
  id: string;
  code: string; // e.g., "WV-PIN-9823-4412"
  amount: number; // 6300
  status: 'UNUSED' | 'USED' | 'TRANSFERRED';
  generatedBy: string; // Admin ID
  assignedTo?: string; // Member ID who holds the PIN
  usedBy?: string; // Member ID who used it to activate
  usedAt?: string;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  capacity: string;
  material: string;
  phRange: string;
  orpLevel: string;
  stock: number;
  image: string;
  description: string;
  features: string[];
  specifications: Record<string, string>;
}

export interface Transaction {
  id: string;
  userId: string;
  userName: string;
  type: 'ROI' | 'REFERRAL' | 'BINARY_PAIR' | 'WITHDRAWAL' | 'PIN_PURCHASE' | 'WALLET_ADJUSTMENT';
  amount: number;
  description: string;
  deduction?: number; // 10% for withdrawal
  netAmount?: number;
  status: 'SUCCESS' | 'PENDING' | 'FAILED' | 'CANCELLED';
  createdAt: string;
}

export interface WithdrawalRequest {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  amount: number; // Requested amount (min ₹300)
  adminFee: number; // 5%
  tdsFee: number; // 5%
  totalDeduction: number; // 10%
  netAmount: number; // Amount to be paid in bank
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  upiId?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  rejectionReason?: string;
  processedAt?: string;
  createdAt: string;
}

export interface Order {
  id: string; // e.g., "WV-ORD-8821"
  userId: string;
  userName: string;
  productName: string;
  quantity: number;
  totalAmount: number;
  shippingAddress: string;
  city: string;
  state: string;
  pincode: string;
  paymentStatus: 'PAID' | 'PENDING';
  shippingStatus: 'PROCESSING' | 'SHIPPED' | 'DELIVERED';
  trackingNumber?: string;
  createdAt: string;
}

export interface SupportTicket {
  id: string;
  userId: string;
  userName: string;
  subject: string;
  category: 'PIN' | 'WITHDRAWAL' | 'PRODUCT' | 'GENEALOGY' | 'OTHER';
  message: string;
  adminReply?: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
  createdAt: string;
}

export interface SystemSettings {
  companyName: string;
  tagline: string;
  packagePrice: number; // 6300
  referralIncome: number; // 300
  pairIncome: number; // 600
  dailyRoiPercentage: number; // 0.5%
  dailyPairCeiling: number; // 10 pairs
  capMultiplier: number; // 3X
  minWithdrawal: number; // 300
  adminDeductionPercent: number; // 5%
  tdsDeductionPercent: number; // 5%
  maintenanceMode: boolean;
  announcementText: string;
}

export interface GenealogyTreeNode {
  user: User;
  left?: GenealogyTreeNode | null;
  right?: GenealogyTreeNode | null;
}
