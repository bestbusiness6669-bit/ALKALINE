import React, { useState } from 'react';
import { User, Transaction, WithdrawalRequest, SystemSettings } from '../../types';
import { Wallet, ArrowUpRight, TrendingUp, ShieldAlert, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface WalletViewProps {
  user: User;
  settings: SystemSettings;
  transactions: Transaction[];
  withdrawals: WithdrawalRequest[];
  onRequestWithdrawal: (amount: number) => { success: boolean; message: string };
}

export const WalletView: React.FC<WalletViewProps> = ({
  user,
  settings,
  transactions,
  withdrawals,
  onRequestWithdrawal,
}) => {
  const [amountInput, setAmountInput] = useState<number>(300);
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null);

  // Calculations
  const requestedAmt = Math.max(0, amountInput);
  const adminFee = (requestedAmt * settings.adminDeductionPercent) / 100;
  const tdsFee = (requestedAmt * settings.tdsDeductionPercent) / 100;
  const totalDeduction = adminFee + tdsFee;
  const netPayable = Math.max(0, requestedAmt - totalDeduction);

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = onRequestWithdrawal(amountInput);
    setFeedback(res);
    if (res.success) {
      setAmountInput(300);
    }
  };

  const userTxns = transactions.filter((t) => t.userId === user.id);
  const userWithdrawals = withdrawals.filter((w) => w.userId === user.id);

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Wallet Balance Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950 p-6 rounded-3xl border border-amber-500/30 text-white shadow-xl space-y-2">
          <div className="text-xs font-bold uppercase text-slate-400">Available Income Wallet</div>
          <div className="text-4xl font-black text-amber-400">₹{user.incomeWallet.toLocaleString()}</div>
          <p className="text-[11px] text-slate-400">Ready for instant bank withdrawal (Min ₹300)</p>
        </div>

        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 rounded-3xl border border-slate-800 text-white shadow-xl space-y-2">
          <div className="text-xs font-bold uppercase text-slate-400">Total Withdrawn</div>
          <div className="text-4xl font-black text-emerald-400">₹{user.withdrawWallet.toLocaleString()}</div>
          <p className="text-[11px] text-slate-400">Processed payout history</p>
        </div>

        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 rounded-3xl border border-slate-800 text-white shadow-xl space-y-2">
          <div className="text-xs font-bold uppercase text-slate-400">Lifetime Earnings</div>
          <div className="text-4xl font-black text-cyan-400">₹{user.totalEarnings.toLocaleString()}</div>
          <p className="text-[11px] text-slate-400">Cap Headroom: ₹{Math.max(0, (user.earningsCap || 18900) - user.totalEarnings).toLocaleString()}</p>
        </div>

      </div>

      {/* Withdrawal Form & Calculation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Withdrawal Form */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ArrowUpRight className="w-5 h-5 text-amber-500" />
            <span>Request Bank Withdrawal</span>
          </h3>

          <form onSubmit={handleWithdrawSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 uppercase">
                Enter Amount (INR) — Min ₹300
              </label>
              <input
                type="number"
                min="300"
                max={user.incomeWallet}
                required
                value={amountInput}
                onChange={(e) => setAmountInput(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-bold text-lg focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Deduction Calculation breakdown */}
            <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Requested Amount:</span>
                <span className="font-bold text-slate-900 dark:text-white">₹{requestedAmt.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Admin Deduction (5%):</span>
                <span className="font-bold text-rose-500">-₹{adminFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">TDS Deduction (5%):</span>
                <span className="font-bold text-rose-500">-₹{tdsFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-slate-700 text-sm font-black">
                <span className="text-slate-900 dark:text-white">Net Bank Deposit:</span>
                <span className="text-emerald-500">₹{netPayable.toFixed(2)}</span>
              </div>
            </div>

            {/* Bank details confirmation */}
            <div className="bg-amber-500/10 p-3 rounded-xl text-xs text-amber-600 dark:text-amber-400 space-y-1 border border-amber-500/20">
              <div className="font-bold">Payout Bank Account Details:</div>
              <div>Bank: {user.bankName || 'Not updated'} | A/C: {user.accountNumber || 'Not updated'}</div>
              <div>IFSC: {user.ifscCode || 'Not updated'} | UPI: {user.upiId || 'Not updated'}</div>
            </div>

            <button
              type="submit"
              disabled={user.incomeWallet < 300}
              className={`w-full py-4 rounded-2xl font-black text-base shadow-lg transition-all ${
                user.incomeWallet >= 300
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:scale-[1.01]'
                  : 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              Submit Withdrawal Request
            </button>
          </form>

          {feedback && (
            <div className={`p-4 rounded-xl text-xs font-bold ${feedback.success ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/30' : 'bg-rose-500/10 text-rose-500 border border-rose-500/30'}`}>
              {feedback.message}
            </div>
          )}
        </div>

        {/* Right Column: Withdrawal Logs */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-500" />
            <span>Withdrawal Payout History</span>
          </h3>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {userWithdrawals.length === 0 ? (
              <div className="text-xs text-slate-400 py-8 text-center">No withdrawal requests yet.</div>
            ) : (
              userWithdrawals.map((w) => (
                <div key={w.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">{w.id}</span>
                    <span className="text-slate-400 text-[10px]">{w.createdAt}</span>
                    <div className="text-[10px] text-slate-400 mt-1">
                      Gross: ₹{w.amount} | Deduct: ₹{w.totalDeduction} | <strong className="text-emerald-400">Net: ₹{w.netAmount}</strong>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] uppercase ${
                    w.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-400' : w.status === 'REJECTED' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {w.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
