import React, { useState } from 'react';
import { X, Copy, Check, FileText, Database, Server, BookOpen } from 'lucide-react';
import { ExportService } from '../../services/exportService';

interface GuidesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuidesModal: React.FC<GuidesModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'SQL' | 'INSTALL' | 'HOSTINGER' | 'README'>('SQL');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const sqlDump = ExportService.generateMySqlDump();

  const copySqlToClipboard = () => {
    navigator.clipboard.writeText(sqlDump);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-4xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] flex flex-col">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              System Documentation & MySQL Database Script
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Complete deployment scripts and technical architecture reference
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 mb-4 shrink-0 overflow-x-auto">
          {[
            { id: 'SQL', label: 'wealth_veda.sql', icon: Database },
            { id: 'HOSTINGER', label: 'Hostinger cPanel Guide', icon: Server },
            { id: 'INSTALL', label: 'Installation Guide', icon: FileText },
            { id: 'README', label: 'Project Architecture', icon: BookOpen },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Box */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          
          {activeTab === 'SQL' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  MySQL Database Schema & Data Dump (MySQL 5.7+ / 8.0+)
                </span>
                <button
                  onClick={copySqlToClipboard}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 hover:scale-105 transition-all"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy SQL Script'}</span>
                </button>
              </div>

              <textarea
                readOnly
                rows={16}
                value={sqlDump}
                className="w-full p-4 rounded-2xl bg-slate-950 text-emerald-400 font-mono text-xs border border-slate-800 focus:outline-none"
              />
            </div>
          )}

          {activeTab === 'HOSTINGER' && (
            <div className="space-y-4 text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/80 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 font-sans">
              <h4 className="font-bold text-base text-amber-500">Hostinger cPanel & Node.js Deployment Steps:</h4>
              <ol className="list-decimal list-inside space-y-2">
                <li>Log into Hostinger hPanel and navigate to <strong>MySQL Databases</strong>. Create database <code>wealth_veda</code> and user.</li>
                <li>Open <strong>phpMyAdmin</strong>, select database <code>wealth_veda</code>, and click <strong>Import</strong>. Choose the copied <code>wealth_veda.sql</code> script.</li>
                <li>Navigate to <strong>Setup Node.js App</strong> under Hosting settings.</li>
                <li>Set App Root to <code>/public_html</code> and Startup File to <code>server.ts</code> or <code>dist/server.cjs</code>.</li>
                <li>Set Node.js version to 18.x or 20.x.</li>
                <li>Configure Environment Variables: <code>DB_HOST=localhost</code>, <code>DB_USER=u123456_wv</code>, <code>DB_NAME=wealth_veda</code>, <code>JWT_SECRET=super_secret_key</code>.</li>
                <li>Click <strong>Run NPM Install</strong> and click <strong>Restart App</strong>. Your MLM site is now live!</li>
              </ol>
            </div>
          )}

          {activeTab === 'INSTALL' && (
            <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/80 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 font-sans">
              <h4 className="font-bold text-base text-amber-500">Local Development Installation:</h4>
              <pre className="p-3 bg-slate-950 text-emerald-400 rounded-xl font-mono text-xs overflow-x-auto">
{`npm install
npm run dev      # Boots full-stack Express + Vite dev server on port 3000
npm run build    # Bundles client static files and server.ts to dist/server.cjs
npm start        # Launches production server`}
              </pre>
            </div>
          )}

          {activeTab === 'README' && (
            <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/80 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 font-sans">
              <h4 className="font-bold text-base text-amber-500">WEALTH VEDA Direct Selling Architecture:</h4>
              <p>
                Product: Grade 304 Stainless Steel 5L Bio-Alkaline Water Jar (₹6,300).
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Direct Sponsor Income: ₹300 per registration.</li>
                <li>Binary Pair Matching: ₹600 per 1:1 pair (10 pairs/day ceiling = ₹6,000/day max).</li>
                <li>Daily ROI: 0.5% (₹31.50/day) Mon–Fri only. Saturdays & Sundays excluded.</li>
                <li>Re-Activation Cap: Automatic status lock at 3X total income (₹18,900). Requires new PIN to reactivate.</li>
                <li>Withdrawal Deduction: 10% (5% Admin Fee + 5% TDS). Minimum withdrawal ₹300.</li>
              </ul>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
