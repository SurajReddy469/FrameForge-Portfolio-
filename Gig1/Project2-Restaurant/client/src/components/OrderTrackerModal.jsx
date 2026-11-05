import React, { useState } from 'react';
import { X, Search, Clock, CheckCircle2, ChefHat, Bike, HeartHandshake, AlertCircle } from 'lucide-react';
import { orderService } from '../services/api';

const OrderTrackerModal = ({ isOpen, onClose, initialOrderNumber = '' }) => {
  const [orderNumber, setOrderNumber] = useState(initialOrderNumber || 'GH-ORD-104921');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSearch = async (e) => {
    e?.preventDefault();
    if (!orderNumber.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await orderService.getOrderByNumber(orderNumber.trim());
      if (res.success && res.data) {
        setOrder(res.data);
      } else {
        setError('Order tracking code not found. Please verify your invoice number.');
      }
    } catch (err) {
      setError(err.message || 'Order not found. Try demo order: GH-ORD-104921');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { key: 'Received', label: 'Order Confirmed', desc: 'Kitchen acknowledged ticket', icon: CheckCircle2 },
    { key: 'Preparing', label: 'Artisanal Preparation', desc: 'Master chefs crafting dish', icon: ChefHat },
    { key: 'Out for Delivery', label: 'Out for Delivery', desc: 'Temperature-controlled transit', icon: Bike },
    { key: 'Delivered', label: 'Delivered', desc: 'Bon Appétit!', icon: HeartHandshake }
  ];

  const getStepIndex = (status) => {
    const s = status || 'Received';
    if (s === 'Received') return 0;
    if (s === 'Preparing') return 1;
    if (s === 'Out for Delivery') return 2;
    if (s === 'Delivered') return 3;
    return 0;
  };

  const activeIndex = order ? getStepIndex(order.orderStatus) : -1;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div onClick={onClose} className="fixed inset-0 bg-stone-950/85 backdrop-blur-md cursor-pointer" />

      <div className="relative w-full max-w-xl bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-2xl z-10 p-6 md:p-8">
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <div>
            <h3 className="font-serif-luxury text-xl font-bold text-amber-100">
              Live Order Tracker
            </h3>
            <p className="text-xs text-stone-400">
              Track real-time kitchen preparation and gourmet transit
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-100 rounded-full hover:bg-stone-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mt-5 flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="e.g. GH-ORD-104921"
              className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-stone-200 uppercase placeholder-stone-500 focus:outline-none focus:border-amber-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider cursor-pointer transition-all disabled:opacity-50"
          >
            {loading ? 'Locating...' : 'Track'}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-3 rounded-xl bg-rose-950/30 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Order Details Display */}
        {order ? (
          <div className="mt-6 space-y-6">
            {/* Header info */}
            <div className="p-4 rounded-2xl bg-stone-950/60 border border-stone-800/80 flex items-center justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-stone-400 block font-medium">Tracking Code</span>
                <span className="font-mono text-base font-bold text-amber-400">{order.orderNumber}</span>
              </div>
              <div className="text-right">
                <span className="text-[11px] uppercase tracking-wider text-stone-400 block font-medium">Est. Delivery</span>
                <span className="text-sm font-semibold text-stone-200 flex items-center gap-1 justify-end">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{order.estimatedDeliveryMins || 30} mins</span>
                </span>
              </div>
            </div>

            {/* Step Progress Tracker */}
            <div className="space-y-4 py-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400">Order Progress</h4>
              <div className="relative border-l-2 border-stone-800 ml-4 pl-6 space-y-6">
                {steps.map((st, idx) => {
                  const Icon = st.icon;
                  const isDone = idx <= activeIndex;
                  const isCurrent = idx === activeIndex;

                  return (
                    <div key={st.key} className="relative group">
                      {/* Step node dot */}
                      <div
                        className={`absolute -left-[35px] top-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                          isDone
                            ? 'bg-amber-500 border-amber-400 text-stone-950 shadow-md shadow-amber-500/30'
                            : 'bg-stone-900 border-stone-700 text-stone-500'
                        }`}
                      >
                        <Icon className="w-4 h-4 stroke-[2.5]" />
                      </div>

                      <div className="pl-2">
                        <p
                          className={`text-sm font-bold ${
                            isCurrent
                              ? 'text-amber-400'
                              : isDone
                              ? 'text-stone-200'
                              : 'text-stone-500'
                          }`}
                        >
                          {st.label}
                        </p>
                        <p className="text-xs text-stone-400 mt-0.5">{st.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Items Summary */}
            <div className="p-4 rounded-2xl bg-stone-950/40 border border-stone-800 space-y-2 text-xs">
              <h5 className="font-semibold text-stone-300 uppercase tracking-wider text-[11px]">
                Order Items ({order.items?.length})
              </h5>
              <div className="space-y-1.5 divide-y divide-stone-850">
                {order.items?.map((it, i) => (
                  <div key={i} className="flex justify-between pt-1.5 text-stone-300">
                    <span>
                      {it.quantity}x {it.title}
                    </span>
                    <span className="font-semibold text-amber-400">₹{it.price * it.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t border-stone-800 flex justify-between font-bold text-sm text-stone-100">
                <span>Grand Total</span>
                <span className="text-amber-400">₹{order.totalAmount}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-8 text-center py-6 text-stone-400 text-xs">
            Enter your 8-digit order confirmation number above to check real-time status.
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTrackerModal;
