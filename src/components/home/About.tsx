import React from 'react';
import { ShieldCheck, HeartPulse, Trophy, Users, Droplet } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors duration-300 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest border border-blue-500/20">
            <Droplet className="w-3.5 h-3.5" />
            <span>Corporate Direct Selling Leader</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            About <span className="text-amber-500">WEALTH VEDA</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
            Founded with a vision to blend holistic wellness with financial empowerment, WEALTH VEDA delivers Grade 304 Stainless Steel Bio-Alkaline Water Jars and a life-changing direct selling compensation plan.
          </p>
        </div>

        {/* 2-Column Grid: Vision & Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          
          {/* Left Column Image */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-amber-500/30 group">
            <img 
              src="/assets/family.jpg" 
              alt="Healthy Family Lifestyle" 
              className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent p-8 flex flex-col justify-end text-white">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Our Wellness Guarantee</span>
              <h3 className="text-2xl font-bold mt-1">Transforming Indian Households</h3>
              <p className="text-xs text-slate-300 mt-2">Providing 100% pure, mineralized pH 8.5–9.5 alkaline water for optimal cellular hydration and family longevity.</p>
            </div>
          </div>

          {/* Right Column Cards: Mission & Vision */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 hover:border-amber-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-4">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Our Vision</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                To become India’s premier product-based direct selling brand, empowering over 1 Million families with healthy alkaline drinking water and financial independence by 2030.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 hover:border-blue-500/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4">
                <HeartPulse className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Our Mission</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                To deliver top-tier bio-alkaline water dispensers at accessible package pricing (₹6,300), backed by a transparent, compliant 1:1 binary compensation plan with daily ROI distributions.
              </p>
            </div>
          </div>

        </div>

        {/* 4 Stats Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 text-center shadow-md">
            <div className="text-3xl sm:text-4xl font-black text-amber-500 mb-1">50,000+</div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Active Distributors</div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 text-center shadow-md">
            <div className="text-3xl sm:text-4xl font-black text-blue-500 mb-1">100%</div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Food Grade Steel</div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 text-center shadow-md">
            <div className="text-3xl sm:text-4xl font-black text-emerald-500 mb-1">₹600</div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Pair Matching Income</div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 text-center shadow-md">
            <div className="text-3xl sm:text-4xl font-black text-purple-500 mb-1">0.5%</div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Daily ROI (Mon-Fri)</div>
          </div>
        </div>

      </div>
    </section>
  );
};
