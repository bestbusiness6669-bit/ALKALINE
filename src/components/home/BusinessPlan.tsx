import React from 'react';
import { DollarSign, Repeat, ShieldCheck, Zap, TrendingUp, Lock, Award, Clock } from 'lucide-react';

interface BusinessPlanProps {
  onOpenRegister: () => void;
}

export const BusinessPlan: React.FC<BusinessPlanProps> = ({ onOpenRegister }) => {
  return (
    <section id="business-plan" className="py-24 bg-slate-950 text-white relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest border border-amber-500/30">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>High Payout Direct Selling Compensation</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
            The <span className="text-amber-500">WEALTH VEDA</span> Business Opportunity
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Turn your passion for health into exponential income. Built with high daily ROI rewards and 1:1 binary matching designed for sustainable growth.
          </p>
        </div>

        {/* 4 Income Streams Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          
          {/* Card 1: Starter Package */}
          <div className="bg-slate-900/90 backdrop-blur-xl p-8 rounded-3xl border border-amber-500/30 shadow-2xl space-y-4 relative group hover:border-amber-500 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center font-black text-xl">
              ₹
            </div>
            <h3 className="text-xl font-bold text-white">Starter Package</h3>
            <div className="text-3xl font-black text-amber-400">₹6,300</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Includes 1x 5L Stainless Steel Bio-Alkaline Water Jar + Free Member ID + 3X Income Cap eligibility.
            </p>
          </div>

          {/* Card 2: Direct Referral */}
          <div className="bg-slate-900/90 backdrop-blur-xl p-8 rounded-3xl border border-blue-500/30 shadow-2xl space-y-4 relative group hover:border-blue-500 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center font-black text-xl">
              ₹
            </div>
            <h3 className="text-xl font-bold text-white">Direct Referral</h3>
            <div className="text-3xl font-black text-blue-400">₹300</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Earn instant ₹300 direct sponsor bonus for every active member referred into your Left or Right team.
            </p>
          </div>

          {/* Card 3: Binary Pair Income */}
          <div className="bg-slate-900/90 backdrop-blur-xl p-8 rounded-3xl border border-emerald-500/30 shadow-2xl space-y-4 relative group hover:border-emerald-500 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-black text-xl">
              1:1
            </div>
            <h3 className="text-xl font-bold text-white">Binary Pair Income</h3>
            <div className="text-3xl font-black text-emerald-400">₹600 / Pair</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              1 Left : 1 Right ratio matching. Up to 10 pairs daily (₹6,000/day max ceiling). Strong leg carry forward!
            </p>
          </div>

          {/* Card 4: Daily ROI */}
          <div className="bg-slate-900/90 backdrop-blur-xl p-8 rounded-3xl border border-purple-500/30 shadow-2xl space-y-4 relative group hover:border-purple-500 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center font-black text-xl">
              %
            </div>
            <h3 className="text-xl font-bold text-white">Customer Daily ROI</h3>
            <div className="text-3xl font-black text-purple-400">0.5% Daily</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Credited Monday to Friday (₹31.50/day). Saturday & Sunday skipped. Automatic credit to Income Wallet.
            </p>
          </div>

        </div>

        {/* 3X Capping & Re-Activation Banner */}
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 p-8 sm:p-12 rounded-3xl border border-amber-500/40 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-wider border border-rose-500/30">
              <Lock className="w-3.5 h-3.5" />
              <span>System Integrity & Sustainability Rule</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold">
              3X Income Cap & Re-Activation Rule
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              When total accumulated earnings (ROI + Referral + Pair) reach <strong className="text-amber-400">3X of your package (₹18,900)</strong>, income generation automatically pauses. The ID becomes inactive for earnings until reactivated with a new <strong className="text-white">₹6,300 Activation PIN</strong>. This ensures 100% financial stability of the binary pool!
            </p>
          </div>
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <button
              onClick={onOpenRegister}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-sm shadow-xl hover:scale-105 transition-all"
              id="business-plan-join-btn"
            >
              Start Earning Today
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
