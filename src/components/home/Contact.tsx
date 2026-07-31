import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Contact Corporate <span className="text-amber-500">Headquarters</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            Have questions regarding PIN generation, product shipping, or leadership registration? Get in touch with us.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-900 p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Send Us a Message
            </h3>

            {submitted ? (
              <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 p-6 rounded-2xl flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 shrink-0" />
                <div>
                  <h4 className="font-bold text-base">Message Sent Successfully!</h4>
                  <p className="text-xs mt-0.5">Thank you for reaching out. Our support team will get back to you within 2 hours.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 uppercase">Full Name</label>
                    <input 
                      type="text" 
                      required 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g. Ramesh Kumar" 
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 uppercase">Phone Number</label>
                    <input 
                      type="tel" 
                      required 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="e.g. 9876543210" 
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 uppercase">Email Address</label>
                  <input 
                    type="email" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="e.g. ramesh@gmail.com" 
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 uppercase">Message</label>
                  <textarea 
                    rows={4} 
                    required 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Tell us how we can help..." 
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 text-sm"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-base shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Address & Google Map Preview */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 text-white p-8 rounded-3xl border border-amber-500/30 shadow-xl space-y-6">
              <h3 className="text-xl font-bold border-b border-slate-800 pb-4">
                Corporate Office
              </h3>
              <div className="space-y-4 text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">WEALTH VEDA INFRA PVT LTD</strong>
                    Thiruchanur, Tirupati.Andhra Pradesh, India
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-amber-500 shrink-0" />
                  <span>+91 98765 43210 / 022-88229911</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-amber-500 shrink-0" />
                  <span>support@wealthveda.com</span>
                </div>
              </div>
            </div>

            {/* Google Maps Simulation Card */}
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 h-64 bg-slate-900 flex items-center justify-center group shadow-xl">
              <iframe 
                title="Wealth Veda Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.793744955355!2d72.86812831490076!3d19.0683939870928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8e22b000001%3A0x6b2b7ff7051a24d!2sBandra%20Kurla%20Complex!5e0!3m2!1sen!2sin!4v1650000000000!5m2!1sen!2sin" 
                className="w-full h-full border-0 filter opacity-80 group-hover:opacity-100 transition-opacity"
                loading="lazy"
              />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
