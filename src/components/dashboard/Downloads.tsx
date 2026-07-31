import React from 'react';
import { Download, FileText, Sparkles, Award } from 'lucide-react';

export const Downloads: React.FC = () => {
  const materials = [
    {
      title: 'WEALTH VEDA Corporate Business Plan (PDF)',
      desc: 'Complete 15-page presentation of direct selling compensation, 1:1 pair matching, and 0.5% daily ROI rules.',
      type: 'Presentation Slide',
      size: '4.2 MB',
    },
    {
      title: 'Alkaline Water Health Benefits & Product Catalog',
      desc: 'Scientific guide on pH 8.5–9.5 bio-alkaline water, negative ORP, and 5L Stainless Steel Jar specifications.',
      type: 'Product Brochure',
      size: '2.8 MB',
    },
    {
      title: 'Distributor Welcome Kit & Compliance Manual',
      desc: 'Official direct selling guidelines, ethics rules, registration procedures, and payout schedule.',
      type: 'Policy Document',
      size: '1.5 MB',
    },
  ];

  const handleDownload = (filename: string) => {
    alert(`Downloading ${filename}...`);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Download className="w-6 h-6 text-amber-500" />
          <span>Marketing Collateral & Downloads</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Official PDF presentations, brochures, and training materials for distributors
        </p>
      </div>

      <div className="space-y-4">
        {materials.map((m, idx) => (
          <div 
            key={idx}
            className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase text-amber-500 bg-amber-500/10 px-2.5 py-0.5 rounded">
                {m.type} • {m.size}
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{m.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl">{m.desc}</p>
            </div>

            <button
              onClick={() => handleDownload(m.title)}
              className="px-5 py-3 rounded-2xl bg-amber-500 text-slate-950 font-bold text-xs shadow-md hover:scale-105 transition-all flex items-center gap-2 shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
