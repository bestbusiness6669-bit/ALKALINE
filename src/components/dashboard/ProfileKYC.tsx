import React, { useState } from 'react';
import { User } from '../../types';
import { ShieldCheck, FileText, Upload, CheckCircle2, AlertCircle, Building, UserCheck } from 'lucide-react';

interface ProfileKYCProps {
  user: User;
  onUpdateKyc: (updated: Partial<User>) => void;
}

export const ProfileKYC: React.FC<ProfileKYCProps> = ({ user, onUpdateKyc }) => {
  const [aadhaar, setAadhaar] = useState(user.aadhaarNumber || '');
  const [pan, setPan] = useState(user.panNumber || '');
  const [bankName, setBankName] = useState(user.bankName || '');
  const [accountNumber, setAccountNumber] = useState(user.accountNumber || '');
  const [ifscCode, setIfscCode] = useState(user.ifscCode || '');
  const [upiId, setUpiId] = useState(user.upiId || '');
  const [savedMsg, setSavedMsg] = useState('');

  const handleKycSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateKyc({
      aadhaarNumber: aadhaar,
      panNumber: pan,
      bankName,
      accountNumber,
      ifscCode,
      upiId,
      kycStatus: 'PENDING',
    });
    setSavedMsg('KYC & Bank details submitted for Admin Verification!');
    setTimeout(() => setSavedMsg(''), 4000);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-amber-500" />
            <span>Profile & KYC Verification</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Submit your identity and bank payout details for instant withdrawal approval
          </p>
        </div>

        {/* KYC Status Badge */}
        <div className="flex items-center gap-2">
          {user.kycStatus === 'APPROVED' ? (
            <span className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> KYC VERIFIED
            </span>
          ) : user.kycStatus === 'PENDING' ? (
            <span className="px-4 py-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" /> PENDING VERIFICATION
            </span>
          ) : (
            <span className="px-4 py-2 rounded-xl bg-slate-500/20 text-slate-400 border border-slate-500/30 text-xs font-bold">
              NOT SUBMITTED
            </span>
          )}
        </div>
      </div>

      {savedMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          <span>{savedMsg}</span>
        </div>
      )}

      {/* KYC Form */}
      <form onSubmit={handleKycSubmit} className="space-y-6">
        
        {/* Identity Section */}
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <FileText className="w-5 h-5 text-amber-500" />
            <span>Identity Documents (Aadhaar & PAN)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 uppercase">Aadhaar Card Number</label>
              <input
                type="text"
                required
                value={aadhaar}
                onChange={(e) => setAadhaar(e.target.value)}
                placeholder="1234-5678-9012"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 uppercase">PAN Card Number</label>
              <input
                type="text"
                required
                value={pan}
                onChange={(e) => setPan(e.target.value.toUpperCase())}
                placeholder="ABCDE1234F"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-amber-500 font-mono uppercase"
              />
            </div>
          </div>
        </div>

        {/* Bank Account Section */}
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <Building className="w-5 h-5 text-amber-500" />
            <span>Bank Account Payout Details</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 uppercase">Bank Name</label>
              <input
                type="text"
                required
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                placeholder="e.g. HDFC Bank"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 uppercase">Account Number</label>
              <input
                type="text"
                required
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="e.g. 50100234567890"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 uppercase">IFSC Code</label>
              <input
                type="text"
                required
                value={ifscCode}
                onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
                placeholder="e.g. HDFC0001234"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-amber-500 font-mono uppercase"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 uppercase">UPI ID (Optional)</label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="e.g. member@upi"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-base shadow-lg hover:scale-[1.01] transition-all mt-4"
          >
            Save & Submit KYC Details
          </button>
        </div>

      </form>
    </div>
  );
};
