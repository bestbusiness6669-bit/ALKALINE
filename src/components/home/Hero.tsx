import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, Zap, TrendingUp, Award, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onOpenRegister: () => void;
  onOpenLogin: () => void;
  onNavigate: (page: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenRegister, onOpenLogin, onNavigate }) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-950 text-white py-20">
      
      {/* Background Hero Water Splash & Ambient Light */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105 transition-transform duration-1000"
        style={{ backgroundImage: `url('/assets/hero-bg.jpg')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-blue-950/40" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-8 text-center lg:text-left"
          >
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg">
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>Healthy Water • Healthy Wealth • Healthy Life</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1]">
              Drink <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-200">Healthy.</span> <br />
              Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500">Wealth.</span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">
              Join <strong className="text-white font-bold">WEALTH VEDA</strong> to enjoy Premium 5-Liter Stainless Steel Bio-Alkaline Water while growing your direct selling income with high daily ROI & 1:1 binary pair payouts.
            </p>

            {/* Key Value Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-slate-900/80 backdrop-blur-md p-3.5 rounded-xl border border-amber-500/20 text-left">
                <div className="text-amber-400 font-extrabold text-lg">₹6,300</div>
                <div className="text-xs text-slate-400 font-medium">Starter Package</div>
              </div>
              <div className="bg-slate-900/80 backdrop-blur-md p-3.5 rounded-xl border border-blue-500/20 text-left">
                <div className="text-cyan-400 font-extrabold text-lg">0.5% Daily</div>
                <div className="text-xs text-slate-400 font-medium">ROI (Mon–Fri)</div>
              </div>
              <div className="bg-slate-900/80 backdrop-blur-md p-3.5 rounded-xl border border-emerald-500/20 text-left col-span-2 sm:col-span-1">
                <div className="text-emerald-400 font-extrabold text-lg">₹600 / Pair</div>
                <div className="text-xs text-slate-400 font-medium">1:1 Binary Income</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={onOpenRegister}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-slate-950 font-black text-base shadow-xl shadow-amber-500/20 hover:scale-[1.03] transition-all flex items-center gap-2"
                id="hero-join-btn"
              >
                <span>Join Now</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onOpenLogin}
                className="px-7 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-white font-bold text-base border border-slate-700 shadow-lg hover:border-amber-500/40 transition-all"
                id="hero-login-btn"
              >
                Login to Dashboard
              </button>

              <button
                onClick={() => onNavigate('business-plan')}
                className="px-6 py-4 rounded-2xl bg-blue-950/60 hover:bg-blue-900/80 text-amber-400 font-semibold text-sm border border-amber-500/30 transition-all flex items-center gap-1.5"
                id="hero-plan-btn"
              >
                <TrendingUp className="w-4 h-4" />
                <span>View Business Plan</span>
              </button>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Free Registration</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>PIN Activated ID</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Min Withdraw ₹300</span>
              </div>
            </div>

          </motion.div>

          {/* Right Column Product Card Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative flex justify-center"
          >
            <div className="relative w-full max-w-md group">
              
              {/* Outer Glowing Frame */}
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-blue-500 to-amber-600 rounded-3xl blur-xl opacity-50 group-hover:opacity-80 transition duration-1000 group-hover:duration-200" />

              {/* Product Card Container */}
              <div className="relative bg-slate-900/90 backdrop-blur-xl border border-amber-500/30 rounded-3xl p-6 shadow-2xl space-y-5">
                
                {/* Product Badge */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-500 text-slate-950 uppercase tracking-wider">
                    Flagship Package
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">5 Liters Capacity</span>
                </div>

                {/* Product Image */}
                <div className="relative rounded-2xl overflow-hidden bg-slate-950 aspect-square flex items-center justify-center border border-slate-800">
                  <img 
                    src="/src/assets/images/regenerated_image_1785505491919.png" 
                    alt="Wealth Veda Alkaline Water Jar" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Overlay Price Badge */}
                  <div className="absolute bottom-3 right-3 bg-slate-950/90 backdrop-blur-md px-4 py-2 rounded-xl border border-amber-500/40 text-right">
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Package Price</div>
                    <div className="text-xl font-black text-amber-400">₹6,300</div>
                  </div>
                </div>

                {/* Product Title & Features */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    5L Stainless Steel Alkaline Water Jar
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    pH 8.5–9.5 Bio-mineral water dispenser with negative ORP antioxidant power for complete health & vitality.
                  </p>

                  <div className="space-y-2 text-xs text-slate-300 border-t border-slate-800 pt-3">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Direct Referral Income:</span>
                      <span className="font-bold text-amber-400">₹300</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Binary Pair Income:</span>
                      <span className="font-bold text-emerald-400">₹600 (1:1 Pair)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Daily ROI (Mon-Fri):</span>
                      <span className="font-bold text-cyan-400">0.5% (₹31.50/day)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Max Income Ceiling:</span>
                      <span className="font-bold text-amber-300">3X (₹18,900)</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
