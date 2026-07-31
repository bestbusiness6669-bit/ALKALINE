import React from 'react';
import { UserPlus, Key, PackageCheck, TrendingUp, Wallet } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Free Registration',
      icon: UserPlus,
      desc: 'Register your free member account using your Sponsor ID and select Left or Right placement.',
    },
    {
      num: '02',
      title: 'PIN Activation',
      icon: Key,
      desc: 'Purchase an official ₹6,300 Activation PIN from corporate admin or sponsor to activate your ID.',
    },
    {
      num: '03',
      title: 'Receive Water Jar',
      icon: PackageCheck,
      desc: 'Your 5L Stainless Steel Bio-Alkaline Water Jar is dispatched directly to your doorstep with tracking.',
    },
    {
      num: '04',
      title: 'Daily ROI & Refer',
      icon: TrendingUp,
      desc: 'Earn 0.5% daily ROI (Mon-Fri) plus ₹300 instant referral bonus for every active member referred.',
    },
    {
      num: '05',
      title: 'Pair Match & Withdraw',
      icon: Wallet,
      desc: 'Match 1:1 binary pairs for ₹600 income. Request instant bank withdrawal with min ₹300 limit.',
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            How It Works in <span className="text-amber-500">5 Simple Steps</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
            Starting your journey to health and financial growth with WEALTH VEDA is seamless.
          </p>
        </div>

        {/* 5-Step Horizontal Flow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div 
                key={idx}
                className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg relative group hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black text-amber-500 tracking-widest uppercase bg-amber-500/10 px-2.5 py-1 rounded-md">
                      STEP {s.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800 text-amber-500 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {s.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
