import React, { useState } from 'react';
import { User, SupportTicket } from '../../types';
import { MessageSquare, Send, CheckCircle2 } from 'lucide-react';

interface SupportTicketsProps {
  user: User;
  tickets: SupportTicket[];
  onCreateTicket: (subject: string, category: 'PIN' | 'WITHDRAWAL' | 'PRODUCT' | 'GENEALOGY' | 'OTHER', message: string) => void;
}

export const SupportTickets: React.FC<SupportTicketsProps> = ({ user, tickets, onCreateTicket }) => {
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState<'PIN' | 'WITHDRAWAL' | 'PRODUCT' | 'GENEALOGY' | 'OTHER'>('PIN');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateTicket(subject, category, message);
    setSubmitted(true);
    setSubject('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  const userTickets = tickets.filter((t) => t.userId === user.id);

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-amber-500" />
          <span>Helpdesk & Support Tickets</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Create support queries regarding activation PINs, payouts, genealogy tree, or shipping
        </p>
      </div>

      {/* Ticket Creation Form */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Create New Ticket</h3>
        
        {submitted && (
          <div className="mb-4 p-4 rounded-xl bg-emerald-500/10 text-emerald-500 font-bold text-xs flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>Support ticket submitted! Corporate admin will respond shortly.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 uppercase">Subject</label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Brief summary..."
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 uppercase">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-amber-500"
              >
                <option value="PIN">Activation PIN Issue</option>
                <option value="WITHDRAWAL">Withdrawal & Wallet</option>
                <option value="PRODUCT">Alkaline Water Jar Shipping</option>
                <option value="GENEALOGY">Genealogy & Placement</option>
                <option value="OTHER">Other Query</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 uppercase">Message</label>
            <textarea
              rows={3}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Detail your question..."
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-amber-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-sm shadow-md hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Submit Support Ticket</span>
          </button>
        </form>
      </div>

      {/* Tickets History */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Your Tickets History</h3>
        {userTickets.length === 0 ? (
          <div className="text-xs text-slate-400 text-center py-6">No support tickets created yet.</div>
        ) : (
          userTickets.map((t) => (
            <div key={t.id} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-black text-amber-500">Ticket #{t.id} • {t.category}</span>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400 uppercase">{t.status}</span>
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-base">{t.subject}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">{t.message}</p>
              {t.adminReply && (
                <div className="bg-amber-500/10 p-3 rounded-xl border border-amber-500/20 text-xs text-amber-700 dark:text-amber-400 font-medium">
                  <strong>Admin Reply:</strong> {t.adminReply}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
