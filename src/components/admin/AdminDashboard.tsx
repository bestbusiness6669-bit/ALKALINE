import React, { useState } from 'react';
import {
  User,
  ActivationPin,
  WithdrawalRequest,
  Transaction,
  Order,
  SystemSettings,
  SupportTicket
} from '../../types';
import { ExportService } from '../../services/exportService';
import {
  ShieldAlert,
  Users,
  Key,
  ArrowUpRight,
  TrendingUp,
  Award,
  Settings as SettingsIcon,
  Download,
  CheckCircle2,
  XCircle,
  Play,
  FileSpreadsheet,
  Database,
  Search,
  DollarSign,
  Lock,
  MessageSquare,
  Sparkles,
  RefreshCw
} from 'lucide-react';

interface AdminDashboardProps {
  currentUser: User;
  usersList: User[];
  pinsList: ActivationPin[];
  withdrawalsList: WithdrawalRequest[];
  transactionsList: Transaction[];
  ordersList: Order[];
  settings: SystemSettings;
  ticketsList: SupportTicket[];
  onGeneratePins: (count: number) => void;
  onTransferPin: (pinCode: string, targetUserId: string) => { success: boolean; message: string };
  onApproveWithdrawal: (id: string) => void;
  onRejectWithdrawal: (id: string, reason: string) => void;
  onApproveKyc: (userId: string) => void;
  onRunRoiEngine: () => void;
  onRunBinaryPairEngine: () => void;
  onUpdateSettings: (newSettings: SystemSettings) => void;
  onToggleUserStatus: (userId: string) => void;
  onAdjustUserWallet: (userId: string, amount: number) => void;
  onReplyTicket: (ticketId: string, reply: string) => void;
  onOpenGuides: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentUser,
  usersList,
  pinsList,
  withdrawalsList,
  transactionsList,
  ordersList,
  settings,
  ticketsList,
  onGeneratePins,
  onTransferPin,
  onApproveWithdrawal,
  onRejectWithdrawal,
  onApproveKyc,
  onRunRoiEngine,
  onRunBinaryPairEngine,
  onUpdateSettings,
  onToggleUserStatus,
  onAdjustUserWallet,
  onReplyTicket,
  onOpenGuides,
}) => {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'USERS' | 'PINS' | 'WITHDRAWALS' | 'KYC' | 'SETTINGS' | 'ENGINE' | 'REPORTS' | 'TICKETS'>('OVERVIEW');

  // PIN Generation state
  const [pinCountInput, setPinCountInput] = useState<number>(5);
  const [transferPinCode, setTransferPinCode] = useState('');
  const [transferTargetUser, setTransferTargetUser] = useState('');
  const [transferFeedback, setTransferFeedback] = useState<{ success: boolean; message: string } | null>(null);

  // User search & filter
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [selectedUserForWallet, setSelectedUserForWallet] = useState<User | null>(null);
  const [walletAdjAmount, setWalletAdjAmount] = useState<number>(1000);

  // Ticket reply state
  const [ticketReplyText, setTicketReplyText] = useState('');

  // Settings form state
  const [settingsForm, setSettingsForm] = useState<SystemSettings>(settings);

  // Engine run notifications
  const [engineMsg, setEngineMsg] = useState('');

  // Dashboard Overview Metrics
  const totalUsers = usersList.length;
  const activeUsers = usersList.filter((u) => u.status === 'ACTIVE').length;
  const todayJoinings = usersList.filter((u) => u.createdAt === new Date().toISOString().split('T')[0]).length;
  const todaySales = activeUsers * settings.packagePrice;
  const pendingWithdrawalsCount = withdrawalsList.filter((w) => w.status === 'PENDING').length;
  const pendingKycCount = usersList.filter((u) => u.kycStatus === 'PENDING').length;
  const totalPairsToday = usersList.reduce((acc, u) => acc + (u.todayPairs || 0), 0);
  const unusedPinsCount = pinsList.filter((p) => p.status === 'UNUSED').length;

  const filteredUsers = usersList.filter(
    (u) =>
      u.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      u.id.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      u.phone.includes(userSearchQuery)
  );

  const handleGeneratePinsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGeneratePins(pinCountInput);
    alert(`Generated ${pinCountInput} new ₹6,300 Activation PINs successfully!`);
  };

  const handleTransferPinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = onTransferPin(transferPinCode, transferTargetUser);
    setTransferFeedback(res);
  };

  const handleSettingsSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings(settingsForm);
    alert('System & Compensation Settings saved successfully!');
  };

  const handleRunRoiClick = () => {
    onRunRoiEngine();
    setEngineMsg('Daily ROI Engine Executed! 0.5% credited for active members (Mon-Fri).');
    setTimeout(() => setEngineMsg(''), 4000);
  };

  const handleRunPairClick = () => {
    onRunBinaryPairEngine();
    setEngineMsg('Binary Pair Engine Executed! 1:1 matching @ ₹600 processed (10 pair ceiling & 3X cap checked).');
    setTimeout(() => setEngineMsg(''), 4000);
  };

  // Export actions
  const exportUsersReport = () => {
    const headers = ['User ID', 'Name', 'Phone', 'Status', 'Sponsor ID', 'Package', 'Left Vol', 'Right Vol', 'Pairs', 'Income Wallet', 'Total Earnings'];
    const rows = usersList.map((u) => [
      u.id,
      u.name,
      u.phone,
      u.status,
      u.sponsorId || 'N/A',
      u.packagePrice,
      u.leftBusiness,
      u.rightBusiness,
      u.lifetimePairs,
      u.incomeWallet,
      u.totalEarnings,
    ]);
    ExportService.downloadCsv('WealthVeda_Members_Report', headers, rows);
  };

  const exportWithdrawalsReport = () => {
    const headers = ['Withdrawal ID', 'User ID', 'User Name', 'Amount (INR)', 'Admin Fee (5%)', 'TDS (5%)', 'Net Payable', 'Bank Account', 'IFSC', 'Status', 'Date'];
    const rows = withdrawalsList.map((w) => [
      w.id,
      w.userId,
      w.userName,
      w.amount,
      w.adminFee,
      w.tdsFee,
      w.netAmount,
      w.accountNumber,
      w.ifscCode,
      w.status,
      w.createdAt,
    ]);
    ExportService.downloadCsv('WealthVeda_Withdrawals_Report', headers, rows);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Admin Top Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 p-6 sm:p-8 rounded-3xl border border-amber-500/40 shadow-2xl text-white flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-black text-xs uppercase">
              Corporate Control Center
            </span>
            <span className="text-xs text-amber-400 font-semibold">Master Admin Access</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            WEALTH VEDA <span className="text-amber-400">Admin Dashboard</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Manage members, generate activation PINs, approve withdrawals, run MLM payout engines & export MySQL database
          </p>
        </div>

        {/* Engine Quick Run Buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleRunRoiClick}
            className="px-4 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-extrabold text-xs shadow-lg hover:scale-105 transition-all flex items-center gap-1.5"
            id="run-roi-cron-btn"
          >
            <Play className="w-4 h-4" />
            <span>Run ROI Cron (0.5%)</span>
          </button>
          
          <button
            onClick={handleRunPairClick}
            className="px-4 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-extrabold text-xs shadow-lg hover:scale-105 transition-all flex items-center gap-1.5"
            id="run-pair-cron-btn"
          >
            <Play className="w-4 h-4" />
            <span>Run Pair Engine (₹600)</span>
          </button>
        </div>
      </div>

      {engineMsg && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-xs flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span>{engineMsg}</span>
        </div>
      )}

      {/* Admin Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 overflow-x-auto pb-2">
        {[
          { id: 'OVERVIEW', label: 'Overview Metrics', icon: TrendingUp },
          { id: 'USERS', label: `Manage Users (${totalUsers})`, icon: Users },
          { id: 'PINS', label: `PIN Engine (${unusedPinsCount} Available)`, icon: Key },
          { id: 'WITHDRAWALS', label: `Withdrawals (${pendingWithdrawalsCount} Pending)`, icon: ArrowUpRight },
          { id: 'KYC', label: `KYC Approvals (${pendingKycCount} Pending)`, icon: CheckCircle2 },
          { id: 'ENGINE', label: 'MLM Engine Controls', icon: Play },
          { id: 'SETTINGS', label: 'System Settings', icon: SettingsIcon },
          { id: 'REPORTS', label: 'Reports & SQL Export', icon: Database },
          { id: 'TICKETS', label: `Support Tickets (${ticketsList.length})`, icon: MessageSquare },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all shrink-0 ${
                isActive
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-amber-500/40'
              }`}
              id={`admin-tab-${tab.id.toLowerCase()}`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW METRICS */}
      {activeTab === 'OVERVIEW' && (
        <div className="space-y-8">
          
          {/* Top 7 Metric Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Total Users</span>
              <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">{totalUsers}</div>
              <span className="text-[10px] text-emerald-500 font-semibold">{activeUsers} Active</span>
            </div>

            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Today's Joinings</span>
              <div className="text-2xl font-black text-amber-500 mt-1">+{todayJoinings}</div>
              <span className="text-[10px] text-slate-400">New Members</span>
            </div>

            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Today's Sales</span>
              <div className="text-2xl font-black text-emerald-400 mt-1">₹{todaySales.toLocaleString()}</div>
              <span className="text-[10px] text-slate-400">₹6,300 Package</span>
            </div>

            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Today's Pairs</span>
              <div className="text-2xl font-black text-cyan-400 mt-1">{totalPairsToday}</div>
              <span className="text-[10px] text-slate-400">1:1 Matched</span>
            </div>

            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Pending Withdraw</span>
              <div className="text-2xl font-black text-rose-400 mt-1">{pendingWithdrawalsCount}</div>
              <span className="text-[10px] text-rose-500 font-semibold">Action Required</span>
            </div>

            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Pending KYC</span>
              <div className="text-2xl font-black text-purple-400 mt-1">{pendingKycCount}</div>
              <span className="text-[10px] text-slate-400">Needs Approval</span>
            </div>

            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Available PINs</span>
              <div className="text-2xl font-black text-amber-400 mt-1">{unusedPinsCount}</div>
              <span className="text-[10px] text-slate-400">Ready to Transfer</span>
            </div>

          </div>

          {/* Recent Registrations Table */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-amber-500" />
              <span>Recent Registrations & Active Members</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold uppercase">
                  <tr>
                    <th className="p-3">Member ID</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Sponsor ID</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Left / Right Vol</th>
                    <th className="p-3">Total Income</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {usersList.slice(0, 6).map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="p-3 font-mono font-bold text-amber-500">{u.id}</td>
                      <td className="p-3 font-bold">{u.name}</td>
                      <td className="p-3 font-mono">{u.sponsorId || 'WV100000'}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          u.status === 'ACTIVE' ? 'bg-emerald-500/20 text-emerald-400' : u.status === 'CAPPED_INACTIVE' ? 'bg-rose-500/20 text-rose-400' : 'bg-slate-500/20 text-slate-400'
                        }`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="p-3 font-mono text-[11px]">
                        L: ₹{u.leftBusiness} | R: ₹{u.rightBusiness}
                      </td>
                      <td className="p-3 font-bold text-emerald-400">₹{u.totalEarnings}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: MANAGE USERS */}
      {activeTab === 'USERS' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={userSearchQuery}
                onChange={(e) => setUserSearchQuery(e.target.value)}
                placeholder="Search by Name, ID, or Phone..."
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <button
              onClick={exportUsersReport}
              className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Export Excel / CSV</span>
            </button>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold uppercase">
                <tr>
                  <th className="p-3">Member ID</th>
                  <th className="p-3">Name & Phone</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Income Wallet</th>
                  <th className="p-3">Total Earnings / Cap</th>
                  <th className="p-3">Left / Right Vol</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="p-3 font-mono font-bold text-amber-500">{u.id}</td>
                    <td className="p-3">
                      <div className="font-bold">{u.name}</div>
                      <div className="text-[10px] text-slate-400">{u.phone}</div>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => onToggleUserStatus(u.id)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          u.status === 'ACTIVE'
                            ? 'bg-emerald-500/20 text-emerald-400 hover:bg-rose-500/20 hover:text-rose-400'
                            : 'bg-rose-500/20 text-rose-400 hover:bg-emerald-500/20 hover:text-emerald-400'
                        }`}
                        title="Click to toggle status"
                      >
                        {u.status}
                      </button>
                    </td>
                    <td className="p-3 font-bold text-emerald-400">₹{u.incomeWallet}</td>
                    <td className="p-3 text-[11px]">
                      ₹{u.totalEarnings} / <span className="text-amber-400 font-bold">₹{u.earningsCap || 18900}</span>
                    </td>
                    <td className="p-3 font-mono text-[10px]">
                      L: ₹{u.leftBusiness} | R: ₹{u.rightBusiness}
                    </td>
                    <td className="p-3 flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedUserForWallet(u);
                          setWalletAdjAmount(1000);
                        }}
                        className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-400 font-bold text-[10px] hover:bg-amber-500 hover:text-slate-950 transition-all"
                      >
                        Adjust Wallet
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Wallet Adjustment Modal */}
          {selectedUserForWallet && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl w-full max-w-sm shadow-2xl space-y-4">
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Adjust Wallet for {selectedUserForWallet.name} ({selectedUserForWallet.id})
                </h3>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">Adjustment Amount (+ / - INR)</label>
                  <input
                    type="number"
                    value={walletAdjAmount}
                    onChange={(e) => setWalletAdjAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-bold"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      onAdjustUserWallet(selectedUserForWallet.id, walletAdjAmount);
                      setSelectedUserForWallet(null);
                    }}
                    className="w-full py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs"
                  >
                    Credit / Debit Wallet
                  </button>
                  <button
                    onClick={() => setSelectedUserForWallet(null)}
                    className="py-2.5 px-4 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

      {/* TAB 3: PIN ENGINE */}
      {activeTab === 'PINS' && (
        <div className="space-y-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Generate PINs Box */}
            <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Key className="w-5 h-5 text-amber-500" />
                <span>Bulk PIN Generation</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Generate 12-character cryptographic Activation PINs for ₹6,300 package activation
              </p>

              <form onSubmit={handleGeneratePinsSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 uppercase">
                    Number of PINs to Generate
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    required
                    value={pinCountInput}
                    onChange={(e) => setPinCountInput(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-bold text-base focus:outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-sm shadow-md hover:scale-[1.01] transition-all"
                  id="generate-pins-btn"
                >
                  Generate ₹6,300 PINs Now
                </button>
              </form>
            </div>

            {/* Transfer PIN Box */}
            <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ArrowUpRight className="w-5 h-5 text-amber-500" />
                <span>Transfer PIN to Member</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Assign an unused PIN to a specific Member ID for account activation
              </p>

              <form onSubmit={handleTransferPinSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 uppercase">Select Unused PIN</label>
                  <select
                    value={transferPinCode}
                    onChange={(e) => setTransferPinCode(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-xs focus:outline-none focus:border-amber-500"
                  >
                    <option value="">-- Choose Unused PIN Code --</option>
                    {pinsList.filter((p) => p.status === 'UNUSED').map((p) => (
                      <option key={p.id} value={p.code}>{p.code} (₹{p.amount})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 uppercase">Target Member ID</label>
                  <input
                    type="text"
                    required
                    value={transferTargetUser}
                    onChange={(e) => setTransferTargetUser(e.target.value.toUpperCase())}
                    placeholder="e.g. WV100003"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-xs uppercase focus:outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-extrabold text-sm shadow-md hover:scale-[1.01] transition-all"
                  id="transfer-pin-btn"
                >
                  Transfer PIN to Member ID
                </button>
              </form>

              {transferFeedback && (
                <div className={`p-3 rounded-xl text-xs font-bold ${transferFeedback.success ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                  {transferFeedback.message}
                </div>
              )}
            </div>

          </div>

          {/* PIN Logs Table */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-x-auto">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Activation PIN Inventory Logs</h3>
            <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold uppercase">
                <tr>
                  <th className="p-3">PIN Code</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Assigned To</th>
                  <th className="p-3">Used By</th>
                  <th className="p-3">Date Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {pinsList.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="p-3 font-mono font-bold text-amber-500">{p.code}</td>
                    <td className="p-3 font-bold">₹{p.amount}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        p.status === 'UNUSED' ? 'bg-emerald-500/20 text-emerald-400' : p.status === 'TRANSFERRED' ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-500/20 text-slate-400'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="p-3 font-mono">{p.assignedTo || 'Unassigned'}</td>
                    <td className="p-3 font-mono">{p.usedBy || 'N/A'}</td>
                    <td className="p-3 text-slate-400">{p.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* TAB 4: WITHDRAWALS APPROVAL */}
      {activeTab === 'WITHDRAWALS' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Withdrawal Approval Queue</h3>
              <p className="text-xs text-slate-500">10% total deduction (5% Admin Fee + 5% TDS) auto-calculated on approvals</p>
            </div>
            <button
              onClick={exportWithdrawalsReport}
              className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Export CSV Report</span>
            </button>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold uppercase">
                <tr>
                  <th className="p-3">WDR ID</th>
                  <th className="p-3">Member ID & Name</th>
                  <th className="p-3">Gross Requested</th>
                  <th className="p-3">10% Deduct</th>
                  <th className="p-3">Net Payout</th>
                  <th className="p-3">Bank / UPI</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {withdrawalsList.map((w) => (
                  <tr key={w.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="p-3 font-mono font-bold text-amber-500">{w.id}</td>
                    <td className="p-3">
                      <div className="font-bold">{w.userName} ({w.userId})</div>
                      <div className="text-[10px] text-slate-400">{w.userPhone}</div>
                    </td>
                    <td className="p-3 font-bold text-slate-900 dark:text-white">₹{w.amount}</td>
                    <td className="p-3 text-rose-500 font-bold">-₹{w.totalDeduction}</td>
                    <td className="p-3 font-black text-emerald-400 text-sm">₹{w.netAmount}</td>
                    <td className="p-3 text-[11px]">
                      <div>{w.bankName} - {w.accountNumber}</div>
                      <div className="text-[10px] text-slate-400">IFSC: {w.ifscCode}</div>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        w.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-400' : w.status === 'REJECTED' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {w.status}
                      </span>
                    </td>
                    <td className="p-3">
                      {w.status === 'PENDING' && (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => onApproveWithdrawal(w.id)}
                            className="px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-[10px] shadow hover:scale-105 transition-all"
                          >
                            Approve & Pay
                          </button>
                          <button
                            onClick={() => onRejectWithdrawal(w.id, 'KYC Document Incomplete')}
                            className="px-2 py-1.5 rounded-lg bg-rose-500/20 text-rose-400 font-bold text-[10px] hover:bg-rose-500 hover:text-white transition-all"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: KYC APPROVALS */}
      {activeTab === 'KYC' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-x-auto">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Pending KYC Submissions Queue</h3>
          <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold uppercase">
              <tr>
                <th className="p-3">Member ID & Name</th>
                <th className="p-3">Aadhaar No</th>
                <th className="p-3">PAN No</th>
                <th className="p-3">Bank Account & IFSC</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {usersList.filter((u) => u.kycStatus === 'PENDING' || u.kycStatus === 'APPROVED').map((u) => (
                <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3">
                    <div className="font-bold text-amber-500">{u.id}</div>
                    <div className="font-semibold text-slate-900 dark:text-white">{u.name}</div>
                  </td>
                  <td className="p-3 font-mono">{u.aadhaarNumber || 'N/A'}</td>
                  <td className="p-3 font-mono">{u.panNumber || 'N/A'}</td>
                  <td className="p-3 text-[11px]">
                    <div>{u.bankName} - {u.accountNumber}</div>
                    <div className="text-[10px] text-slate-400">IFSC: {u.ifscCode}</div>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      u.kycStatus === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {u.kycStatus}
                    </span>
                  </td>
                  <td className="p-3">
                    {u.kycStatus === 'PENDING' && (
                      <button
                        onClick={() => onApproveKyc(u.id)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-[10px] shadow hover:scale-105 transition-all"
                      >
                        Approve KYC
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 6: ENGINE CONTROLS */}
      {activeTab === 'ENGINE' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Play className="w-6 h-6 text-cyan-500" />
              <span>0.5% Daily ROI Engine</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Credits 0.5% (₹31.50) to all Active members from Monday to Friday. Skips Saturday & Sunday automatically. Checks 3X cap limit.
            </p>
            <button
              onClick={handleRunRoiClick}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-sm shadow-lg hover:scale-[1.01] transition-all"
            >
              Trigger Daily ROI Credit Run
            </button>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Play className="w-6 h-6 text-emerald-500" />
              <span>1:1 Binary Pair Matching Engine</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Calculates 1 Left : 1 Right pair matching @ ₹600 per pair. Enforces 10 pair daily ceiling limit (max ₹6,000/day) and updates leg carry forward.
            </p>
            <button
              onClick={handleRunPairClick}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-slate-950 font-black text-sm shadow-lg hover:scale-[1.01] transition-all"
            >
              Trigger Binary Matching Payout Run
            </button>
          </div>

        </div>
      )}

      {/* TAB 7: SYSTEM SETTINGS */}
      {activeTab === 'SETTINGS' && (
        <form onSubmit={handleSettingsSave} className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3">
            Compensation Plan & System Rules Configurator
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Package Price (INR)</label>
              <input
                type="number"
                value={settingsForm.packagePrice}
                onChange={(e) => setSettingsForm({...settingsForm, packagePrice: Number(e.target.value)})}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Direct Referral Income (INR)</label>
              <input
                type="number"
                value={settingsForm.referralIncome}
                onChange={(e) => setSettingsForm({...settingsForm, referralIncome: Number(e.target.value)})}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Binary Pair Payout (INR)</label>
              <input
                type="number"
                value={settingsForm.pairIncome}
                onChange={(e) => setSettingsForm({...settingsForm, pairIncome: Number(e.target.value)})}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Daily Pair Ceiling (Pairs)</label>
              <input
                type="number"
                value={settingsForm.dailyPairCeiling}
                onChange={(e) => setSettingsForm({...settingsForm, dailyPairCeiling: Number(e.target.value)})}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Daily ROI (%) (Mon-Fri)</label>
              <input
                type="number"
                step="0.1"
                value={settingsForm.dailyRoiPercentage}
                onChange={(e) => setSettingsForm({...settingsForm, dailyRoiPercentage: Number(e.target.value)})}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Income Cap Multiplier (3X)</label>
              <input
                type="number"
                value={settingsForm.capMultiplier}
                onChange={(e) => setSettingsForm({...settingsForm, capMultiplier: Number(e.target.value)})}
                className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-amber-500 text-slate-950 font-black text-sm shadow-lg hover:scale-[1.01] transition-all"
          >
            Save System Settings
          </button>
        </form>
      )}

      {/* TAB 8: REPORTS & MYSQL DUMP */}
      {activeTab === 'REPORTS' && (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 max-w-4xl mx-auto">
          <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Database className="w-6 h-6 text-amber-500" />
            <span>Database Backup & MySQL Schema Export</span>
          </h3>

          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Download the production-ready MySQL `.sql` script containing all tables (`users`, `activation_pins`, `transactions`, `withdrawals`, `orders`, `system_settings`), foreign keys, stored procedures, and initial seed data for Hostinger cPanel / phpMyAdmin deployment.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={onOpenGuides}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs shadow-lg hover:scale-105 transition-all flex items-center gap-2"
              id="view-sql-modal-btn"
            >
              <Database className="w-4 h-4" />
              <span>View & Copy wealth_veda.sql</span>
            </button>

            <button
              onClick={exportUsersReport}
              className="px-6 py-3.5 rounded-2xl bg-slate-800 text-white font-bold text-xs border border-slate-700 hover:border-amber-500/40 transition-all flex items-center gap-2"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>Export Members Excel</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 9: SUPPORT TICKETS */}
      {activeTab === 'TICKETS' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Member Support Queries</h3>
          <div className="space-y-4">
            {ticketsList.map((t) => (
              <div key={t.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-amber-500">#{t.id} - {t.userName} ({t.userId})</span>
                  <span className="text-[10px] bg-blue-500/20 text-blue-400 font-bold px-2 py-0.5 rounded">{t.status}</span>
                </div>
                <div className="font-bold text-sm text-slate-900 dark:text-white">{t.subject}</div>
                <div className="text-xs text-slate-600 dark:text-slate-300">{t.message}</div>
                {t.adminReply ? (
                  <div className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 p-2 rounded-xl">
                    Reply: {t.adminReply}
                  </div>
                ) : (
                  <div className="flex gap-2 pt-2">
                    <input
                      type="text"
                      placeholder="Write admin reply..."
                      value={ticketReplyText}
                      onChange={(e) => setTicketReplyText(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border text-xs text-slate-900 dark:text-white"
                    />
                    <button
                      onClick={() => {
                        if (ticketReplyText) {
                          onReplyTicket(t.id, ticketReplyText);
                          setTicketReplyText('');
                        }
                      }}
                      className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
                    >
                      Send Reply
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
