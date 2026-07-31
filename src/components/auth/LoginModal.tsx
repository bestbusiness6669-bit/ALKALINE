import React, { useState } from 'react';
import { X, LogIn, Key, UserCheck, ShieldAlert, Sparkles } from 'lucide-react';
import { User } from '../../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
  usersList: User[];
  onOpenRegister: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  usersList,
  onOpenRegister,
}) => {
  const [memberId, setMemberId] = useState('');
  const [password, setPassword] = useState('password123');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const targetUser = usersList.find(
      (u) => u.id.toLowerCase() === memberId.trim().toLowerCase() || u.email.toLowerCase() === memberId.trim().toLowerCase()
    );

    if (targetUser) {
      onLoginSuccess(targetUser);
      onClose();
    } else {
      setErrorMsg('Invalid Member ID / Email. Try test user ID: WV100001');
    }
  };

  const handleQuickPresetLogin = (userId: string) => {
    const user = usersList.find((u) => u.id === userId);
    if (user) {
      onLoginSuccess(user);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/30 flex items-center justify-center">
            <LogIn className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              User Login
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Access your WEALTH VEDA income wallet & binary tree
            </p>
          </div>
        </div>

        {/* 1-Click Test User Login Preset */}
        <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-2xl mb-6">
          <div className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>1-Click Quick User Login:</span>
          </div>
          <button
            type="button"
            onClick={() => handleQuickPresetLogin('WV100001')}
            className="w-full px-3 py-2.5 rounded-xl bg-blue-900/80 hover:bg-blue-800 text-white text-xs font-bold border border-amber-500/30 flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            <UserCheck className="w-4 h-4 text-emerald-400" />
            <span>User Login (ID: WV100001)</span>
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 text-xs font-bold text-rose-500 bg-rose-500/10 p-3 rounded-xl border border-rose-500/20">
            {errorMsg}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 uppercase">
              Member ID or Email
            </label>
            <input
              type="text"
              required
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
              placeholder="e.g. WV100001"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 uppercase">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-base shadow-lg hover:scale-[1.01] transition-all"
            id="modal-login-btn"
          >
            Sign In to Dashboard
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
          Don't have an ID yet?{' '}
          <button
            onClick={() => {
              onClose();
              onOpenRegister();
            }}
            className="text-amber-500 font-bold hover:underline"
          >
            Register Free Now
          </button>
        </div>

      </div>
    </div>
  );
};
