import React from 'react';
import { Droplet, ShieldAlert, Sparkles, HeartPulse, Activity, Zap } from 'lucide-react';

export const Benefits: React.FC = () => {
  const benefits = [
    {
      icon: Droplet,
      title: 'Micro-Clustered Hydration',
      color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
      description: 'Reduces water molecule clusters for 3X faster absorption into your cells, keeping your energy elevated all day long.',
    },
    {
      icon: Sparkles,
      title: 'Antioxidant Negative ORP',
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
      description: 'Rich in free hydrogen ions with negative Oxidation-Reduction Potential (-200 mV) that neutralizes free radicals.',
    },
    {
      icon: HeartPulse,
      title: 'Optimal pH 8.5 – 9.5 Balance',
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      description: 'Counteracts acidic waste from modern diets, supporting healthy digestion, bone density, and metabolic efficiency.',
    },
    {
      icon: Activity,
      title: 'Healthy Active Lifestyle',
      color: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
      description: 'Promotes faster muscle recovery after workouts, detoxifies internal organs, and supports radiant skin.',
    },
  ];

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest border border-emerald-500/20">
            <Zap className="w-3.5 h-3.5" />
            <span>Health & Bio-Chemistry Benefits</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Why Choose <span className="text-amber-500">Alkaline Water?</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
            Standard tap and bottled RO water are often acidic and stripped of essential bio-minerals. WEALTH VEDA restores natural mineral balance.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((b, idx) => {
            const IconComponent = b.icon;
            return (
              <div 
                key={idx}
                className="bg-white dark:bg-slate-800/90 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className={`w-14 h-14 rounded-2xl ${b.color} border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <IconComponent className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {b.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  {b.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
