import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Star, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const testimonials = [
    {
      name: 'Rajesh Sharma',
      role: 'Crown Leader, Delhi',
      income: 'Earned ₹1.5+ Lakhs',
      quote: 'WEALTH VEDA provided both health for my family with the Stainless Steel Alkaline Jar and financial independence. The 1:1 pair matching payout of ₹600 is prompt and reliable!',
    },
    {
      name: 'Priya Verma',
      role: 'Diamond Executive, Bangalore',
      income: 'Earned ₹80,000+',
      quote: 'The 0.5% Mon-Fri daily ROI is a great customer incentive. My team loves the quality of the water jar dispenser and the transparent 3X capping system.',
    },
    {
      name: 'Dr. Vikramaditya',
      role: 'Naturopathy Specialist',
      income: 'Product Advocate',
      quote: 'Switching to pH 8.5–9.5 alkaline water has immense health benefits for cellular hydration and neutralizing metabolic acidity. Outstanding product quality!',
    },
  ];

  const faqs = [
    {
      q: 'What is the package price and what do I get?',
      a: 'The package price is ₹6,300. It includes 1x Grade 304 Stainless Steel 5-Liter Bio-Alkaline Water Jar delivered to your doorstep, plus an active Member ID in the binary network.',
    },
    {
      q: 'How does the 0.5% Daily ROI work?',
      a: 'You receive 0.5% of package value (₹31.50/day) credited directly to your Income Wallet from Monday to Friday. ROI is skipped on Saturdays and Sundays.',
    },
    {
      q: 'What is the Binary Pair Income and Daily Ceiling?',
      a: 'You earn ₹600 for every 1 Left : 1 Right pair matched in your binary downline tree. The daily pair matching ceiling is 10 pairs per day (₹6,000/day max binary earnings). Unmatched strong leg volume carries forward.',
    },
    {
      q: 'What is the 3X Re-Activation Cap Rule?',
      a: 'When your total accumulated income (ROI + Referral + Binary Pair) reaches 3X of package price (3 × ₹6,300 = ₹18,900), income generation automatically stops for that ID. To resume earning, you must re-activate using a new ₹6,300 Activation PIN.',
    },
    {
      q: 'What is the Minimum Withdrawal & Deduction?',
      a: 'The minimum withdrawal limit is ₹300. A standard 10% total deduction (5% Admin Fee + 5% TDS) applies on all payouts.',
    },
  ];

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Testimonials Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Success Stories & <span className="text-amber-500">Testimonials</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            Hear from our top leaders and satisfied families across India.
          </p>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {testimonials.map((t, idx) => (
            <div 
              key={idx}
              className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl space-y-4 relative"
            >
              <Quote className="w-8 h-8 text-amber-500/30 absolute top-6 right-6" />
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed italic">
                "{t.quote}"
              </p>
              <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                <div className="font-bold text-slate-900 dark:text-white">{t.name}</div>
                <div className="text-xs text-amber-500 font-semibold">{t.role} • {t.income}</div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest border border-blue-500/20 mb-3">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Got Questions?</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between font-bold text-slate-900 dark:text-white text-base sm:text-lg focus:outline-none"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-amber-500 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
