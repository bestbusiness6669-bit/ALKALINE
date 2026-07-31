import React from 'react';
import { Droplets, ShieldCheck, Sun, Moon, LogIn, UserPlus, ShieldAlert, FileText, Menu, X } from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  currentUser: User | null;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  onLogout: () => void;
  onNavigate: (page: string) => void;
  activePage: string;
  onOpenGuides: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  setDarkMode,
  currentUser,
  onOpenLogin,
  onOpenRegister,
  onLogout,
  onNavigate,
  activePage,
  onOpenGuides,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Products', id: 'products' },
    { label: 'Business Plan', id: 'business-plan' },
    { label: 'Income Plan', id: 'income-plan' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-amber-500/20 shadow-lg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 cursor-pointer group"
          id="brand-logo-btn"
        >
          <div className="relative w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-amber-500 via-amber-300 to-amber-600 shadow-md group-hover:scale-105 transition-transform duration-300">
            <img 
              src="/assets/logo.jpg" 
              alt="Wealth Veda Logo" 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
              WEALTH <span className="text-amber-500">VEDA</span>
            </div>
            <p className="text-[10px] font-medium tracking-widest text-blue-900 dark:text-amber-400 uppercase">
              Healthy Water • Wealth • Life
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`text-sm font-semibold transition-colors duration-200 hover:text-amber-500 ${
                activePage === link.id
                  ? 'text-amber-500 font-bold border-b-2 border-amber-500 pb-1'
                  : 'text-slate-700 dark:text-slate-200'
              }`}
              id={`nav-link-${link.id}`}
            >
              {link.label}
            </button>
          ))}

          {/* Guides / SQL Code Button */}
          <button
            onClick={onOpenGuides}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 hover:bg-amber-500/20 transition-all"
            id="docs-sql-btn"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Docs & SQL Dump</span>
          </button>
        </nav>

        {/* Action Controls & User Auth */}
        <div className="flex items-center gap-3">
          
          {/* Dark / Light Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-amber-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
            title="Toggle Dark/Light Mode"
            id="theme-toggle-btn"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {currentUser ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate(currentUser.role === 'ADMIN' ? 'admin' : 'dashboard')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-blue-900 via-slate-900 to-blue-950 text-amber-400 border border-amber-500/40 shadow-md hover:shadow-amber-500/20 transition-all"
                id="user-panel-btn"
              >
                {currentUser.role === 'ADMIN' ? <ShieldAlert className="w-4 h-4 text-amber-400" /> : <ShieldCheck className="w-4 h-4 text-emerald-400" />}
                <span>{currentUser.role === 'ADMIN' ? 'Admin Panel' : 'User Panel'}</span>
              </button>

              <button
                onClick={onLogout}
                className="px-3 py-2 text-xs font-bold rounded-lg text-rose-500 hover:bg-rose-500/10 transition-colors"
                id="logout-btn"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={onOpenLogin}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-100 hover:text-amber-500 transition-colors"
                id="login-btn"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </button>
              
              <button
                onClick={onOpenRegister}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md hover:shadow-amber-500/30 hover:scale-[1.02] transition-all"
                id="join-now-header-btn"
              >
                <UserPlus className="w-4 h-4" />
                <span>Register Free</span>
              </button>
            </div>
          )}

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200"
            id="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-6 space-y-4">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                onNavigate(link.id);
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-base font-medium text-slate-700 dark:text-slate-200 hover:text-amber-500"
            >
              {link.label}
            </button>
          ))}

          <button
            onClick={() => {
              onOpenGuides();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 text-base font-semibold text-amber-500"
          >
            📜 Docs & MySQL SQL Dump
          </button>

          {!currentUser && (
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-3">
              <button
                onClick={() => {
                  onOpenLogin();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold"
              >
                Login
              </button>
              <button
                onClick={() => {
                  onOpenRegister();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold"
              >
                Register Free
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
