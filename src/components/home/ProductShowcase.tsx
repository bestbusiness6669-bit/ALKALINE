import React from 'react';
import { ALKALINE_WATER_JAR_PRODUCT } from '../../data/initialData';
import { ShieldCheck, Sparkles, Check, Package, Droplets, RefreshCw } from 'lucide-react';

interface ProductShowcaseProps {
  onOpenRegister: () => void;
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({ onOpenRegister }) => {
  const product = ALKALINE_WATER_JAR_PRODUCT;

  return (
    <section id="products" className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-widest border border-amber-500/20">
            <Package className="w-3.5 h-3.5" />
            <span>Direct Selling Starter Package</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Flagship <span className="text-amber-500">Alkaline Water Jar</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
            Included with every ₹6,300 activation package! High-grade stainless steel construction with internal bio-ceramic minerals that elevate drinking water to pH 8.5 – 9.5.
          </p>
        </div>

        {/* Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-slate-50 dark:bg-slate-900/60 p-8 sm:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-5 relative flex flex-col items-center">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-2xl group">
              <img 
                src="/src/assets/images/regenerated_image_1785505491919.png" 
                alt="Wealth Veda Alkaline Water Jar" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-amber-500 text-slate-950 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                5 Liters Capacity
              </div>
            </div>

            {/* Price Tag */}
            <div className="mt-6 w-full bg-gradient-to-r from-blue-900 to-slate-900 text-white p-5 rounded-2xl border border-amber-500/30 flex items-center justify-between shadow-lg">
              <div>
                <span className="text-xs text-slate-400 block uppercase font-semibold">Package Price (Incl. Taxes & Shipping)</span>
                <span className="text-3xl font-black text-amber-400">₹6,300</span>
              </div>
              <button
                onClick={onOpenRegister}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold text-sm shadow-md hover:scale-105 transition-all"
                id="order-jar-btn"
              >
                Order & Activate ID
              </button>
            </div>
          </div>

          {/* Right Column: Specs & Features */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                {product.name}
              </h3>
              <p className="text-amber-500 font-semibold text-sm mt-1">
                {product.tagline}
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-sm mt-3 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Key Features List */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Product Highlights</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs font-medium text-slate-700 dark:text-slate-200">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Specifications Table */}
            <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Technical Specifications</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {Object.entries(product.specifications).slice(0, 4).map(([key, value], idx) => (
                  <div key={idx} className="bg-white dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="text-[10px] text-slate-400 font-semibold uppercase">{key}</div>
                    <div className="text-xs font-bold text-slate-900 dark:text-amber-400 mt-0.5">{value}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
