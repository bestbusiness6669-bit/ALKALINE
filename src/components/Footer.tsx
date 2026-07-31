import React from 'react';
import { Droplet, Phone, Mail, MapPin, ShieldCheck, ExternalLink, Award } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
  onOpenGuides: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenGuides }) => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-amber-500/20 relative overflow-hidden">
      
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-amber-500 to-amber-300">
                <img src="/assets/logo.jpg" alt="Logo" className="w-full h-full object-cover rounded-full" />
              </div>
              <div className="text-2xl font-black text-white tracking-tight">
                WEALTH <span className="text-amber-500">VEDA</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Pioneering healthy hydration and financial freedom across India through premium bio-alkaline water technology and sustainable direct selling opportunities.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20 w-fit">
              <Award className="w-4 h-4 text-amber-400" />
              <span>ISO 9001:2025 Certified Corporate Company</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" /> Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-amber-400 transition-colors">Home</button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-amber-400 transition-colors">About Us</button>
              </li>
              <li>
                <button onClick={() => onNavigate('products')} className="hover:text-amber-400 transition-colors">Alkaline Water Jar</button>
              </li>
              <li>
                <button onClick={() => onNavigate('business-plan')} className="hover:text-amber-400 transition-colors">Business Plan ₹6,300</button>
              </li>
              <li>
                <button onClick={() => onNavigate('income-plan')} className="hover:text-amber-400 transition-colors">Income Plan & ROI Rules</button>
              </li>
            </ul>
          </div>

          {/* Business & Legal */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" /> System & Legal
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={onOpenGuides} className="text-amber-400 hover:underline flex items-center gap-1 font-semibold">
                  <ExternalLink className="w-3.5 h-3.5" /> Hostinger & MySQL Deployment Guide
                </button>
              </li>
              <li>
                <button onClick={onOpenGuides} className="hover:text-amber-400 transition-colors">Export Database Dump (.SQL)</button>
              </li>
              <li>
                <span className="text-slate-400">Direct Selling Guidelines Compliance</span>
              </li>
              <li>
                <span className="text-slate-400">Privacy Policy & Terms of Service</span>
              </li>
              <li>
                <span className="text-slate-400">Refund & Product Return Policy</span>
              </li>
            </ul>
          </div>

          {/* Corporate Contact */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" /> Contact Us
            </h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <span>Thiruchanur, Tirupati.Andhra Pradesh, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span>+91 98765 43210 / 022-88229911</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span>support@wealthveda.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 WEALTH VEDA INFRA PVT LTD. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span>Package Price: ₹6,300</span>
            <span>•</span>
            <span>Binary Pair: ₹600</span>
            <span>•</span>
            <span>Daily ROI: 0.5% (Mon-Fri)</span>
            <span>•</span>
            <span>Max Cap: 3X (₹18,900)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
