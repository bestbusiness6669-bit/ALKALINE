import React, { useState } from 'react';
import { User, SystemSettings, ActivationPin } from '../../types';
import {
  Wallet,
  TrendingUp,
  Award,
  Users,
  Copy,
  Check,
  Key,
  AlertTriangle,
  Lock,
  RefreshCw,
  Clock,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Droplet
} from 'lucide-react';

interface UserDashboardProps {
  user: User;
  settings: SystemSettings;
  pinsList: ActivationPin[];
  onActivateWithPin: (pinCode: string) => { success: boolean; message: string };
  onNavigate: (tab: string) => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  user,
  settings,
  pinsList,
  onActivateWithPin,
  onNavigate,
}) => {
  const [pinInput, setPinInput] = useState('');
  const [pinFeedback, setPinFeedback] = useState<{ success: boolean; message: string } | null>(null);
  const [copiedLeft, setCopiedLeft] = useState(false);
  const [copiedRight, setCopiedRight] = useState(false);

  // 3X Cap calculation
  const totalCap = user.earningsCap || user.packagePrice * settings.capMultiplier; // ₹18,900
  const totalEarnings = user.totalEarnings || 0;
  const capPercentage = Math.min(100, Math.round((totalEarnings / totalCap) * 100));
  const remainingHeadroom = Math.max(0, totalCap - totalEarnings);

  const handleActivateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pinInput.trim()) return;
    const res = onActivateWithPin(pinInput.trim());
    setPinFeedback(res);
    if (res.success) setPinInput('');
  };

  const referralLinkLeft = `https://wealthveda.com/register?sponsor=${user.id}&placement=LEFT`;
  const referralLinkRight = `https://wealthveda.com/register?sponsor=${user.id}&placement=RIGHT`;

  const copyToClipboard = (text: string, isLeft: boolean) => {
    navigator.clipboard.writeText(text);
    if (isLeft) {
      setCopiedLeft(true);
      setTimeout(() => setCopiedLeft(false), 2000);
    } else {
      setCopiedRight(true);
      setTimeout(() => setCopiedRight(false), 2000);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Active Status & Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-slate-950 p-6 sm:p-8 rounded-3xl border border-amber-500/30 shadow-2xl relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-black uppercase tracking-widest bg-amber-500 text-slate-950 px-3 py-1 rounded-full">
                Member ID: {user.id}
              </span>
              {user.status === 'ACTIVE' ? (
                <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">
                  <ShieldCheck className="w-4 h-4" /> ACTIVE ID
                </span>
              ) : user.status === 'CAPPED_INACTIVE' ? (
                <span className="flex items-center gap-1.5 text-xs font-bold text-rose-400 bg-rose-500/20 px-3 py-1 rounded-full border border-rose-500/30">
                  <Lock className="w-4 h-4" /> 3X CAPPED - RE-ACTIVATION REQUIRED
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-xs font-bold text-amber-400 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/30">
                  <Clock className="w-4 h-4" /> FREE REGISTRATION (INACTIVE)
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              Welcome Back, <span className="text-amber-400">{user.name}</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Sponsor: <strong className="text-white">{user.sponsorId || 'WV100000'}</strong> • Joined: {user.createdAt}
            </p>
          </div>

          {/* Quick Activation Action or Status Badge */}
          {user.status !== 'ACTIVE' && (
            <div className="bg-slate-900/90 p-4 rounded-2xl border border-amber-500/40 w-full md:w-80">
              <h4 className="text-xs font-bold text-amber-400 uppercase mb-2 flex items-center gap-1">
                <Key className="w-4 h-4" /> Account Activation
              </h4>
              <form onSubmit={handleActivateSubmit} className="space-y-2">
                <input
                  type="text"
                  required
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter 12-digit Activation PIN"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono uppercase focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="w-full py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs shadow-md hover:scale-105 transition-all"
                >
                  Submit PIN & Activate ₹6,300 ID
                </button>
              </form>
              {pinFeedback && (
                <div className={`mt-2 text-[11px] font-semibold ${pinFeedback.success ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {pinFeedback.message}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 3X Earnings Cap Progress Meter */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-500" />
              <span>3X Income Cap Rule Meter</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Package: ₹{user.packagePrice.toLocaleString()} • Maximum Cap Limit: ₹{totalCap.toLocaleString()} (3X)
            </p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-amber-500">₹{totalEarnings.toLocaleString()}</span>
            <span className="text-xs text-slate-400 font-medium"> / ₹{totalCap.toLocaleString()} ({capPercentage}%)</span>
          </div>
        </div>

        {/* Cap Progress Bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-4 rounded-full overflow-hidden p-0.5 border border-slate-200 dark:border-slate-700">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${
              capPercentage >= 100
                ? 'bg-rose-500'
                : capPercentage >= 75
                ? 'bg-amber-500'
                : 'bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400'
            }`}
            style={{ width: `${capPercentage}%` }}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1">
          <span>Remaining Earning Capacity: <strong className="text-emerald-500">₹{remainingHeadroom.toLocaleString()}</strong></span>
          {capPercentage >= 100 ? (
            <span className="text-rose-500 font-bold flex items-center gap-1">
              <AlertTriangle className="w-4 h-4" /> Cap Reached! Buy a new PIN to reactivate ID.
            </span>
          ) : (
            <span>ID is active for payouts</span>
          )}
        </div>
      </div>

      {/* Wallet Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div 
          onClick={() => onNavigate('wallet')}
          className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg hover:border-amber-500/40 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-400 uppercase">Income Wallet</span>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white">
            ₹{user.incomeWallet.toLocaleString()}
          </div>
          <div className="text-xs text-emerald-500 font-semibold mt-2 flex items-center gap-1">
            <span>Available for Withdrawal</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>

        <div 
          onClick={() => onNavigate('wallet')}
          className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg hover:border-blue-500/40 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-400 uppercase">Daily ROI Payout</span>
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white">
            ₹{user.roiIncome.toLocaleString()}
          </div>
          <div className="text-xs text-slate-400 font-medium mt-2">
            0.5% Mon–Fri (₹31.50/day)
          </div>
        </div>

        <div 
          onClick={() => onNavigate('wallet')}
          className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg hover:border-emerald-500/40 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-400 uppercase">Binary Pair Payout</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white">
            ₹{user.binaryIncome.toLocaleString()}
          </div>
          <div className="text-xs text-emerald-500 font-semibold mt-2">
            {user.lifetimePairs} Pairs Matched (₹600/pair)
          </div>
        </div>

        <div 
          onClick={() => onNavigate('wallet')}
          className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg hover:border-purple-500/40 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-400 uppercase">Direct Referrals</span>
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white">
            ₹{user.referralIncome.toLocaleString()}
          </div>
          <div className="text-xs text-purple-400 font-semibold mt-2">
            ₹300 Per Direct Sponsor
          </div>
        </div>

      </div>

      {/* Binary Volume & Carry Forward Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Leg Stats */}
        <div className="bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950 p-6 sm:p-8 rounded-3xl border border-blue-500/30 text-white shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <h4 className="font-bold text-lg">LEFT TEAM LEG</h4>
            </div>
            <span className="text-xs font-bold bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full border border-blue-500/30">
              {user.leftCount} Members
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-xs text-slate-400 font-medium block">Total Volume</span>
              <span className="text-2xl font-black text-amber-400">₹{user.leftBusiness.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 font-medium block">Carry Forward</span>
              <span className="text-2xl font-black text-cyan-400">₹{user.leftCarryForward.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Right Leg Stats */}
        <div className="bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950 p-6 sm:p-8 rounded-3xl border border-emerald-500/30 text-white shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <h4 className="font-bold text-lg">RIGHT TEAM LEG</h4>
            </div>
            <span className="text-xs font-bold bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30">
              {user.rightCount} Members
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-xs text-slate-400 font-medium block">Total Volume</span>
              <span className="text-2xl font-black text-amber-400">₹{user.rightBusiness.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 font-medium block">Carry Forward</span>
              <span className="text-2xl font-black text-emerald-400">₹{user.rightCarryForward.toLocaleString()}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Referral Links Section */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <span>Your Direct Sponsor Referral Links</span>
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left Referral Link */}
          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-blue-600 dark:text-blue-400">
              <span>LEFT LEG REGISTRATION LINK</span>
              <span className="text-[10px] uppercase bg-blue-500/10 px-2 py-0.5 rounded">Sponsor: {user.id}</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={referralLinkLeft}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-mono text-slate-700 dark:text-slate-300 select-all"
              />
              <button
                onClick={() => copyToClipboard(referralLinkLeft, true)}
                className="p-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold hover:scale-105 transition-all shrink-0"
                title="Copy Link"
              >
                {copiedLeft ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Right Referral Link */}
          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <span>RIGHT LEG REGISTRATION LINK</span>
              <span className="text-[10px] uppercase bg-emerald-500/10 px-2 py-0.5 rounded">Sponsor: {user.id}</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={referralLinkRight}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-mono text-slate-700 dark:text-slate-300 select-all"
              />
              <button
                onClick={() => copyToClipboard(referralLinkRight, false)}
                className="p-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold hover:scale-105 transition-all shrink-0"
                title="Copy Link"
              >
                {copiedRight ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
