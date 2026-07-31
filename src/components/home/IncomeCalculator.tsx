import React, { useState } from 'react';
import { Calculator, Sparkles, TrendingUp, DollarSign, AlertCircle } from 'lucide-react';

export const IncomeCalculator: React.FC = () => {
  const [packagesCount, setPackagesCount] = useState<number>(1);
  const [dailyPairsCount, setDailyPairsCount] = useState<number>(3);

  // Calculations
  const packageCost = packagesCount * 6300;
  const roiPerDay = packagesCount * 31.50; // 0.5% of 6300
  const roiPerMonth = roiPerDay * 22; // approx 22 Mon-Fri working days in a month

  const actualDailyPairs = Math.min(dailyPairsCount, 10); // max 10 pairs ceiling
  const dailyPairIncome = actualDailyPairs * 600;
  const monthlyPairIncome = dailyPairIncome * 30;

  const totalMonthlyPotential = roiPerMonth + monthlyPairIncome;
  const totalIncomeCapPerId = 6300 * 3; // ₹18,900 cap per package

  return (
    <section id="income-plan" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest border border-amber-500/30">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Profit Simulator</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
            Income <span className="text-amber-500">Projection Calculator</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Estimate your daily and monthly earning potential with our 0.5% Mon-Fri ROI and ₹600 binary pair matching algorithm.
          </p>
        </div>

        {/* Calculator Widget Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-slate-950 p-8 sm:p-12 rounded-3xl border border-amber-500/30 shadow-2xl items-center">
          
          {/* Controls Column */}
          <div className="lg:col-span-6 space-y-8">
            
            {/* Slider 1: Packages Count */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-bold text-slate-200">
                  Activated Packages (₹6,300 each):
                </label>
                <span className="text-xl font-black text-amber-400">{packagesCount} ID(s)</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={packagesCount}
                onChange={(e) => setPackagesCount(Number(e.target.value))}
                className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>1 Package (₹6,300)</span>
                <span>10 Packages (₹63,000)</span>
              </div>
            </div>

            {/* Slider 2: Daily Binary Pairs */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-bold text-slate-200">
                  Expected Daily Pair Matches:
                </label>
                <span className="text-xl font-black text-emerald-400">{actualDailyPairs} Pair(s) / Day</span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={dailyPairsCount}
                onChange={(e) => setDailyPairsCount(Number(e.target.value))}
                className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>0 Pairs</span>
                <span>Max Ceiling (10 Pairs / Day)</span>
              </div>
            </div>

            {/* Rules Note */}
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                <AlertCircle className="w-4 h-4" />
                <span>Cap & Ceiling Enforcement:</span>
              </div>
              <p>• Max 10 pairs ceiling per ID per day (₹6,000/day max binary earnings).</p>
              <p>• Daily ROI paid Monday to Friday only (0.5% = ₹31.50 per ₹6,300 ID).</p>
              <p>• Total earnings per ID capped at 3X (₹18,900). Requires new PIN for re-activation.</p>
            </div>

          </div>

          {/* Results Summary Box */}
          <div className="lg:col-span-6 bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950 p-8 rounded-3xl border border-amber-500/40 shadow-xl space-y-6">
            <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Projected Earning Summary</span>
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                <div className="text-xs text-slate-400 font-medium">Daily ROI (Mon-Fri)</div>
                <div className="text-xl font-extrabold text-cyan-400">₹{roiPerDay.toFixed(2)}</div>
              </div>

              <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                <div className="text-xs text-slate-400 font-medium">Daily Pair Payout</div>
                <div className="text-xl font-extrabold text-emerald-400">₹{dailyPairIncome.toLocaleString()}</div>
              </div>
            </div>

            <div className="bg-amber-500/10 p-5 rounded-2xl border border-amber-500/30">
              <div className="text-xs text-amber-300 font-semibold uppercase tracking-wider">Total Monthly Potential</div>
              <div className="text-3xl sm:text-4xl font-black text-amber-400 mt-1">
                ₹{totalMonthlyPotential.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
              <div className="text-[11px] text-slate-400 mt-2">
                *Subject to 3X earnings cap limit (₹{totalIncomeCapPerId * packagesCount} max earnings before re-activation).
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
