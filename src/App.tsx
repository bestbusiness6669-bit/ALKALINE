import React, { useState, useEffect } from 'react';
import {
  User,
  ActivationPin,
  WithdrawalRequest,
  Transaction,
  Order,
  SystemSettings,
  SupportTicket,
  PlacementLeg
} from './types';
import {
  INITIAL_USERS,
  INITIAL_PINS,
  INITIAL_TRANSACTIONS,
  INITIAL_WITHDRAWALS,
  INITIAL_ORDERS,
  INITIAL_SETTINGS,
  INITIAL_TICKETS
} from './data/initialData';
import { MlmEngineService } from './services/mlmEngine';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './components/home/Hero';
import { About } from './components/home/About';
import { ProductShowcase } from './components/home/ProductShowcase';
import { Benefits } from './components/home/Benefits';
import { BusinessPlan } from './components/home/BusinessPlan';
import { HowItWorks } from './components/home/HowItWorks';
import { IncomeCalculator } from './components/home/IncomeCalculator';
import { Testimonials } from './components/home/Testimonials';
import { Contact } from './components/home/Contact';
import { LoginModal } from './components/auth/LoginModal';
import { RegisterModal } from './components/auth/RegisterModal';
import { UserDashboard } from './components/dashboard/UserDashboard';
import { GenealogyTree } from './components/dashboard/GenealogyTree';
import { WalletView } from './components/dashboard/WalletView';
import { ProfileKYC } from './components/dashboard/ProfileKYC';
import { ProductOrders } from './components/dashboard/ProductOrders';
import { Downloads } from './components/dashboard/Downloads';
import { SupportTickets } from './components/dashboard/SupportTickets';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { GuidesModal } from './components/modals/GuidesModal';

export function App() {
  // Theme dark mode state
  const [darkMode, setDarkMode] = useState<boolean>(true);

  // App Master State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [usersList, setUsersList] = useState<User[]>(INITIAL_USERS);
  const [pinsList, setPinsList] = useState<ActivationPin[]>(INITIAL_PINS);
  const [transactionsList, setTransactionsList] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [withdrawalsList, setWithdrawalsList] = useState<WithdrawalRequest[]>(INITIAL_WITHDRAWALS);
  const [ordersList, setOrdersList] = useState<Order[]>(INITIAL_ORDERS);
  const [settings, setSettings] = useState<SystemSettings>(INITIAL_SETTINGS);
  const [ticketsList, setTicketsList] = useState<SupportTicket[]>(INITIAL_TICKETS);

  // Navigation & View state
  const [activeView, setActiveView] = useState<'home' | 'dashboard' | 'admin' | 'genealogy' | 'wallet' | 'profile' | 'orders' | 'downloads' | 'support'>('home');

  // Modals state
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isGuidesOpen, setIsGuidesOpen] = useState(false);

  // Dark mode class toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Login handler
  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    if (user.role === 'ADMIN') {
      setActiveView('admin');
    } else {
      setActiveView('dashboard');
    }
  };

  // Logout handler
  const handleLogout = () => {
    setCurrentUser(null);
    setActiveView('home');
  };

  // Free Registration handler
  const handleRegisterSuccess = (newUser: User) => {
    setUsersList((prev) => [newUser, ...prev]);

    // Create a product order for new member
    const newOrder: Order = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: newUser.id,
      userName: newUser.name,
      productName: '5-Liter Stainless Steel Bio-Alkaline Water Jar',
      quantity: 1,
      totalAmount: 6300,
      paymentStatus: 'PAID',
      shippingStatus: 'PROCESSING',
      createdAt: new Date().toISOString().split('T')[0],
      shippingAddress: 'Main Delivery Address',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110001',
    };
    setOrdersList((prev) => [newOrder, ...prev]);

    // If sponsor exists, add referral bonus ₹300 if user activated with pin
    if (newUser.status === 'ACTIVE' && newUser.sponsorId) {
      const sponsor = usersList.find((u) => u.id === newUser.sponsorId);
      if (sponsor) {
        const updatedSponsor = {
          ...sponsor,
          incomeWallet: sponsor.incomeWallet + settings.referralIncome,
          referralIncome: sponsor.referralIncome + settings.referralIncome,
          totalEarnings: sponsor.totalEarnings + settings.referralIncome,
        };
        setUsersList((prev) => prev.map((u) => (u.id === sponsor.id ? updatedSponsor : u)));
      }
    }
  };

  // Activate ID with 12-digit PIN
  const handleActivateWithPin = (pinCode: string): { success: boolean; message: string } => {
    if (!currentUser) return { success: false, message: 'Please login first' };

    const targetPin = pinsList.find((p) => p.code.toLowerCase() === pinCode.trim().toLowerCase());
    if (!targetPin) {
      return { success: false, message: 'Invalid Activation PIN code!' };
    }
    if (targetPin.status === 'USED') {
      return { success: false, message: 'This PIN has already been used!' };
    }

    // Mark PIN as USED
    const updatedPins = pinsList.map((p) =>
      p.code === targetPin.code
        ? { ...p, status: 'USED' as const, usedBy: currentUser.id, usedAt: new Date().toISOString().split('T')[0] }
        : p
    );
    setPinsList(updatedPins);

    // Activate current user
    const updatedUser: User = {
      ...currentUser,
      status: 'ACTIVE',
      packagePrice: targetPin.amount,
      activationDate: new Date().toISOString().split('T')[0],
      earningsCap: targetPin.amount * settings.capMultiplier, // ₹18,900
    };
    setCurrentUser(updatedUser);
    setUsersList((prev) => prev.map((u) => (u.id === currentUser.id ? updatedUser : u)));

    // Credit Referral Income ₹300 to Sponsor ID
    if (currentUser.sponsorId) {
      const sponsor = usersList.find((u) => u.id === currentUser.sponsorId);
      if (sponsor) {
        const referralAmt = settings.referralIncome;
        const newTotal = sponsor.totalEarnings + referralAmt;
        const cap = sponsor.earningsCap || sponsor.packagePrice * settings.capMultiplier;

        if (newTotal <= cap) {
          const updatedSponsor = {
            ...sponsor,
            incomeWallet: sponsor.incomeWallet + referralAmt,
            referralIncome: sponsor.referralIncome + referralAmt,
            totalEarnings: newTotal,
          };
          setUsersList((prev) => prev.map((u) => (u.id === sponsor.id ? updatedSponsor : u)));

          const txn: Transaction = {
            id: `TXN-${Math.floor(10000 + Math.random() * 90000)}`,
            userId: sponsor.id,
            userName: sponsor.name,
            type: 'REFERRAL',
            amount: referralAmt,
            description: `Direct Referral Payout for activating Member ${currentUser.id}`,
            createdAt: new Date().toISOString().split('T')[0],
            status: 'SUCCESS',
          };
          setTransactionsList((prev) => [txn, ...prev]);
        }
      }
    }

    return { success: true, message: `Account ID ${currentUser.id} Activated Successfully!` };
  };

  // Request Withdrawal
  const handleRequestWithdrawal = (amount: number): { success: boolean; message: string } => {
    if (!currentUser) return { success: false, message: 'Please login first' };
    if (amount < settings.minWithdrawal) {
      return { success: false, message: `Minimum withdrawal amount is ₹${settings.minWithdrawal}` };
    }
    if (currentUser.incomeWallet < amount) {
      return { success: false, message: 'Insufficient Income Wallet balance' };
    }

    const adminFee = (amount * settings.adminDeductionPercent) / 100;
    const tdsFee = (amount * settings.tdsDeductionPercent) / 100;
    const totalDeduction = adminFee + tdsFee;
    const netAmount = amount - totalDeduction;

    const newReq: WithdrawalRequest = {
      id: `WDR-${Math.floor(10000 + Math.random() * 90000)}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userPhone: currentUser.phone,
      amount,
      adminFee,
      tdsFee,
      totalDeduction,
      netAmount,
      bankName: currentUser.bankName || 'HDFC Bank',
      accountNumber: currentUser.accountNumber || '5010011223344',
      ifscCode: currentUser.ifscCode || 'HDFC0001234',
      status: 'PENDING',
      createdAt: new Date().toISOString().split('T')[0],
    };

    setWithdrawalsList((prev) => [newReq, ...prev]);

    // Deduct balance from income wallet
    const updatedUser = {
      ...currentUser,
      incomeWallet: currentUser.incomeWallet - amount,
    };
    setCurrentUser(updatedUser);
    setUsersList((prev) => prev.map((u) => (u.id === currentUser.id ? updatedUser : u)));

    return { success: true, message: `Withdrawal request of ₹${amount} submitted! Net Bank Transfer: ₹${netAmount.toFixed(2)}` };
  };

  // Run ROI Cron
  const handleRunRoiEngine = () => {
    const { updatedUsers, transactions } = MlmEngineService.calculateDailyRoi(usersList, settings);
    setUsersList(updatedUsers);
    setTransactionsList((prev) => [...transactions, ...prev]);
    if (currentUser) {
      const u = updatedUsers.find((x) => x.id === currentUser.id);
      if (u) setCurrentUser(u);
    }
  };

  // Run Binary Matching Cron
  const handleRunBinaryPairEngine = () => {
    const { updatedUsers, transactions } = MlmEngineService.calculateBinaryPairMatching(usersList, settings);
    setUsersList(updatedUsers);
    setTransactionsList((prev) => [...transactions, ...prev]);
    if (currentUser) {
      const u = updatedUsers.find((x) => x.id === currentUser.id);
      if (u) setCurrentUser(u);
    }
  };

  // Generate Bulk PINs
  const handleGeneratePins = (count: number) => {
    const newPins: ActivationPin[] = Array.from({ length: count }).map(() => ({
      id: `PIN-GEN-${Math.floor(10000 + Math.random() * 90000)}`,
      code: `WV-PIN-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
      amount: settings.packagePrice,
      status: 'UNUSED',
      generatedBy: 'WV100000',
      createdAt: new Date().toISOString().split('T')[0],
    }));
    setPinsList((prev) => [...newPins, ...prev]);
  };

  // Transfer PIN to Member
  const handleTransferPin = (pinCode: string, targetUserId: string): { success: boolean; message: string } => {
    const pin = pinsList.find((p) => p.code === pinCode);
    if (!pin || pin.status !== 'UNUSED') return { success: false, message: 'Invalid or already assigned PIN code' };

    const targetUser = usersList.find((u) => u.id === targetUserId);
    if (!targetUser) return { success: false, message: 'Target Member ID not found' };

    const updatedPins = pinsList.map((p) =>
      p.code === pinCode ? { ...p, status: 'TRANSFERRED' as const, assignedTo: targetUserId } : p
    );
    setPinsList(updatedPins);

    return { success: true, message: `PIN ${pinCode} transferred to Member ${targetUserId} (${targetUser.name})` };
  };

  // Approve Withdrawal
  const handleApproveWithdrawal = (id: string) => {
    const req = withdrawalsList.find((w) => w.id === id);
    if (!req) return;

    setWithdrawalsList((prev) =>
      prev.map((w) => (w.id === id ? { ...w, status: 'APPROVED' as const, processedAt: new Date().toISOString().split('T')[0] } : w))
    );

    // Increment user's withdrawWallet
    setUsersList((prev) =>
      prev.map((u) => (u.id === req.userId ? { ...u, withdrawWallet: u.withdrawWallet + req.amount } : u))
    );
  };

  // Reject Withdrawal
  const handleRejectWithdrawal = (id: string, reason: string) => {
    const req = withdrawalsList.find((w) => w.id === id);
    if (!req) return;

    setWithdrawalsList((prev) =>
      prev.map((w) => (w.id === id ? { ...w, status: 'REJECTED' as const } : w))
    );

    // Refund income wallet
    setUsersList((prev) =>
      prev.map((u) => (u.id === req.userId ? { ...u, incomeWallet: u.incomeWallet + req.amount } : u))
    );
  };

  // Approve KYC
  const handleApproveKyc = (userId: string) => {
    setUsersList((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, kycStatus: 'APPROVED' as const } : u))
    );
  };

  // Toggle user active/inactive
  const handleToggleUserStatus = (userId: string) => {
    setUsersList((prev) =>
      prev.map((u) =>
        u.id === userId ? { ...u, status: u.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' } : u
      )
    );
  };

  // Adjust User Wallet balance manually
  const handleAdjustUserWallet = (userId: string, amount: number) => {
    setUsersList((prev) =>
      prev.map((u) =>
        u.id === userId
          ? {
              ...u,
              incomeWallet: u.incomeWallet + amount,
              totalEarnings: u.totalEarnings + (amount > 0 ? amount : 0),
            }
          : u
      )
    );
  };

  // Support ticket creation
  const handleCreateTicket = (subject: string, category: any, message: string) => {
    if (!currentUser) return;
    const newTicket: SupportTicket = {
      id: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: currentUser.id,
      userName: currentUser.name,
      subject,
      category,
      message,
      status: 'OPEN',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setTicketsList((prev) => [newTicket, ...prev]);
  };

  // Admin reply ticket
  const handleReplyTicket = (ticketId: string, reply: string) => {
    setTicketsList((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, adminReply: reply, status: 'RESOLVED' as const } : t))
    );
  };

  // Add Dummy member for genealogy testing
  const handleAddDummyMember = (parentId: string, placement: PlacementLeg) => {
    const newId = `WV${Math.floor(100000 + Math.random() * 900000)}`;
    const newMember: User = {
      id: newId,
      name: `Member ${newId.slice(-4)}`,
      email: `user${newId}@wealthveda.com`,
      phone: `98000${Math.floor(10000 + Math.random() * 90000)}`,
      role: 'USER',
      status: 'ACTIVE',
      sponsorId: parentId,
      parentId,
      placement,
      packagePrice: 6300,
      packageName: 'Alkaline Water Package',
      activationDate: new Date().toISOString().split('T')[0],
      incomeWallet: 0,
      withdrawWallet: 0,
      totalEarnings: 0,
      earningsCap: 18900,
      roiIncome: 0,
      referralIncome: 0,
      binaryIncome: 0,
      leftCount: 0,
      rightCount: 0,
      leftBusiness: 0,
      rightBusiness: 0,
      leftCarryForward: 0,
      rightCarryForward: 0,
      todayPairs: 0,
      lifetimePairs: 0,
      kycStatus: 'APPROVED',
      createdAt: new Date().toISOString().split('T')[0],
    };

    setUsersList((prev) => [...prev, newMember]);
    alert(`Added new Member ${newId} under Parent ${parentId} on ${placement} Leg!`);
  };

  // Delete Member Node
  const handleDeleteMember = (userId: string) => {
    setUsersList((prev) => prev.filter((u) => u.id !== userId));
    alert(`Member ID ${userId} deleted!`);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300 flex flex-col">
      
      {/* Header */}
      <Header
        currentUser={currentUser}
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenRegister={() => setIsRegisterOpen(true)}
        onOpenGuides={() => setIsGuidesOpen(true)}
        onLogout={handleLogout}
        activeView={activeView}
        onNavigate={(view) => setActiveView(view as any)}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      {/* Main Container View Router */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* PUBLIC LANDING PAGE VIEW */}
        {activeView === 'home' && (
          <div className="space-y-12">
            <Hero
              onOpenRegister={() => setIsRegisterOpen(true)}
              onOpenLogin={() => setIsLoginOpen(true)}
              onOpenGuides={() => setIsGuidesOpen(true)}
            />
            <About />
            <ProductShowcase />
            <Benefits />
            <BusinessPlan />
            <HowItWorks />
            <IncomeCalculator />
            <Testimonials />
            <Contact />
          </div>
        )}

        {/* USER DASHBOARD OVERVIEW */}
        {activeView === 'dashboard' && currentUser && (
          <UserDashboard
            user={currentUser}
            settings={settings}
            pinsList={pinsList}
            onActivateWithPin={handleActivateWithPin}
            onNavigate={(tab) => setActiveView(tab as any)}
          />
        )}

        {/* GENEALOGY TREE VIEW */}
        {activeView === 'genealogy' && currentUser && (
          <GenealogyTree
            currentUser={currentUser}
            allUsers={usersList}
            onAddDummyMember={handleAddDummyMember}
            onDeleteMember={handleDeleteMember}
          />
        )}

        {/* WALLET VIEW */}
        {activeView === 'wallet' && currentUser && (
          <WalletView
            user={currentUser}
            settings={settings}
            transactions={transactionsList}
            withdrawals={withdrawalsList}
            onRequestWithdrawal={handleRequestWithdrawal}
          />
        )}

        {/* PROFILE & KYC */}
        {activeView === 'profile' && currentUser && (
          <ProfileKYC
            user={currentUser}
            onUpdateKyc={(updated) => {
              const u = { ...currentUser, ...updated };
              setCurrentUser(u);
              setUsersList((prev) => prev.map((x) => (x.id === currentUser.id ? u : x)));
            }}
          />
        )}

        {/* PRODUCT ORDERS */}
        {activeView === 'orders' && currentUser && (
          <ProductOrders
            user={currentUser}
            orders={ordersList}
            settings={settings}
          />
        )}

        {/* MARKETING DOWNLOADS */}
        {activeView === 'downloads' && (
          <Downloads />
        )}

        {/* SUPPORT TICKETS */}
        {activeView === 'support' && currentUser && (
          <SupportTickets
            user={currentUser}
            tickets={ticketsList}
            onCreateTicket={handleCreateTicket}
          />
        )}

        {/* ADMIN DASHBOARD VIEW */}
        {activeView === 'admin' && currentUser && currentUser.role === 'ADMIN' && (
          <AdminDashboard
            currentUser={currentUser}
            usersList={usersList}
            pinsList={pinsList}
            withdrawalsList={withdrawalsList}
            transactionsList={transactionsList}
            ordersList={ordersList}
            settings={settings}
            ticketsList={ticketsList}
            onGeneratePins={handleGeneratePins}
            onTransferPin={handleTransferPin}
            onApproveWithdrawal={handleApproveWithdrawal}
            onRejectWithdrawal={handleRejectWithdrawal}
            onApproveKyc={handleApproveKyc}
            onRunRoiEngine={handleRunRoiEngine}
            onRunBinaryPairEngine={handleRunBinaryPairEngine}
            onUpdateSettings={setSettings}
            onToggleUserStatus={handleToggleUserStatus}
            onAdjustUserWallet={handleAdjustUserWallet}
            onReplyTicket={handleReplyTicket}
            onOpenGuides={() => setIsGuidesOpen(true)}
          />
        )}

      </main>

      {/* Footer */}
      <Footer
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenRegister={() => setIsRegisterOpen(true)}
        onOpenGuides={() => setIsGuidesOpen(true)}
      />

      {/* Auth & Documentation Modals */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        usersList={usersList}
        onOpenRegister={() => {
          setIsLoginOpen(false);
          setIsRegisterOpen(true);
        }}
      />

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onRegisterSuccess={handleRegisterSuccess}
        usersList={usersList}
        onOpenLogin={() => {
          setIsRegisterOpen(false);
          setIsLoginOpen(true);
        }}
      />

      <GuidesModal
        isOpen={isGuidesOpen}
        onClose={() => setIsGuidesOpen(false)}
      />

    </div>
  );
}

export default App;
