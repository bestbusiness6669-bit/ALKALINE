import React, { useState } from 'react';
import { X, UserPlus, CheckCircle2, ShieldCheck, Key } from 'lucide-react';
import { User, PlacementLeg } from '../../types';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterSuccess: (newUser: User) => void;
  usersList: User[];
  onOpenLogin: () => void;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({
  isOpen,
  onClose,
  onRegisterSuccess,
  usersList,
  onOpenLogin,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [sponsorId, setSponsorId] = useState('WV100001');
  const [placement, setPlacement] = useState<PlacementLeg>('LEFT');
  const [activationPin, setActivationPin] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  // Verify sponsor name
  const sponsorUser = usersList.find((u) => u.id === sponsorId.trim().toUpperCase());

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newId = `WV${Math.floor(100000 + Math.random() * 900000)}`;

    const newUser: User = {
      id: newId,
      name,
      email,
      phone,
      role: 'USER',
      status: activationPin.trim() ? 'ACTIVE' : 'INACTIVE',
      sponsorId: sponsorUser ? sponsorUser.id : 'WV100000',
      parentId: sponsorUser ? sponsorUser.id : 'WV100000',
      placement,
      packagePrice: 6300,
      packageName: 'Alkaline Water Package',
      activationDate: activationPin.trim() ? new Date().toISOString().split('T')[0] : undefined,
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
      kycStatus: 'NOT_SUBMITTED',
      createdAt: new Date().toISOString().split('T')[0],
    };

    onRegisterSuccess(newUser);
    setSuccessMsg(`Registration Successful! Your Member ID is ${newId}. You can now log in.`);
    setTimeout(() => {
      onClose();
      onOpenLogin();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-lg p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
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
            <UserPlus className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              Free Registration
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Join WEALTH VEDA direct selling network today
            </p>
          </div>
        </div>

        {successMsg ? (
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 p-6 rounded-2xl text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-500" />
            <h4 className="font-bold text-lg">{successMsg}</h4>
            <p className="text-xs text-slate-400">Redirecting to login portal...</p>
          </div>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            
            {/* Sponsor ID & Placement Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 uppercase">
                  Sponsor ID
                </label>
                <input
                  type="text"
                  required
                  value={sponsorId}
                  onChange={(e) => setSponsorId(e.target.value.toUpperCase())}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white text-xs font-bold uppercase focus:outline-none focus:border-amber-500"
                />
                {sponsorUser && (
                  <span className="text-[10px] text-emerald-500 font-bold block mt-1">
                    ✓ Sponsor: {sponsorUser.name}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 uppercase">
                  Binary Leg Placement
                </label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <button
                    type="button"
                    onClick={() => setPlacement('LEFT')}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      placement === 'LEFT'
                        ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    LEFT LEG
                  </button>
                  <button
                    type="button"
                    onClick={() => setPlacement('RIGHT')}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      placement === 'RIGHT'
                        ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    RIGHT LEG
                  </button>
                </div>
              </div>
            </div>

            {/* Personal Info */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 uppercase">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Anand Sharma"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 uppercase">
                  Mobile Phone
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 9811002233"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 uppercase">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. anand@gmail.com"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Optional Activation PIN input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 uppercase flex items-center justify-between">
                <span>Activation PIN (Optional for immediate activation)</span>
                <span className="text-amber-500 text-[10px]">Pkg: ₹6,300</span>
              </label>
              <input
                type="text"
                value={activationPin}
                onChange={(e) => setActivationPin(e.target.value)}
                placeholder="e.g. WV-PIN-8812-9901 (or activate later)"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-amber-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-base shadow-lg hover:scale-[1.01] transition-all mt-2"
              id="submit-register-btn"
            >
              Complete Free Registration
            </button>
          </form>
        )}

        <div className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
          Already registered?{' '}
          <button
            onClick={() => {
              onClose();
              onOpenLogin();
            }}
            className="text-amber-500 font-bold hover:underline"
          >
            Sign In Here
          </button>
        </div>

      </div>
    </div>
  );
};
