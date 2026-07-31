import React from 'react';
import { User, Order, SystemSettings } from '../../types';
import { ExportService } from '../../services/exportService';
import { Package, Truck, Printer, CheckCircle2, Clock } from 'lucide-react';

interface ProductOrdersProps {
  user: User;
  orders: Order[];
  settings: SystemSettings;
}

export const ProductOrders: React.FC<ProductOrdersProps> = ({ user, orders, settings }) => {
  const userOrders = orders.filter((o) => o.userId === user.id);

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Package className="w-6 h-6 text-amber-500" />
            <span>Product Orders & Invoices</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Track your 5L Stainless Steel Alkaline Water Jar deliveries and print official Tax Invoices
          </p>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {userOrders.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 p-12 rounded-3xl border border-slate-200 dark:border-slate-800 text-center text-slate-400">
            No order history found for your account.
          </div>
        ) : (
          userOrders.map((ord) => (
            <div 
              key={ord.id}
              className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 gap-2">
                <div>
                  <span className="text-xs font-black text-amber-500">Order ID: #{ord.id}</span>
                  <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{ord.productName}</div>
                  <div className="text-xs text-slate-500">Date: {ord.createdAt} • Qty: {ord.quantity}</div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                    ord.shippingStatus === 'DELIVERED'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : ord.shippingStatus === 'SHIPPED'
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {ord.shippingStatus}
                  </span>

                  <button
                    onClick={() => ExportService.printInvoice(ord, user, settings)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shadow-md hover:scale-105 transition-all"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Tax Invoice</span>
                  </button>
                </div>
              </div>

              {/* Order Info Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span className="text-slate-400 block font-semibold">Total Amount</span>
                  <strong className="text-amber-500 font-bold text-sm">₹{ord.totalAmount.toLocaleString()}</strong>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span className="text-slate-400 block font-semibold">Courier Tracking</span>
                  <strong className="text-slate-900 dark:text-white font-mono">{ord.trackingNumber || 'Processing Dispatch...'}</strong>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span className="text-slate-400 block font-semibold">Shipping Address</span>
                  <span className="text-slate-700 dark:text-slate-300 truncate block">{ord.shippingAddress}, {ord.city}</span>
                </div>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
};
