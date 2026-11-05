import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Clock, Copy, Check, Compass, ArrowRight, UtensilsCrossed, Phone } from 'lucide-react';
import confetti from 'canvas-confetti';
import { orderService } from '../services/api';
import OrderTrackerModal from '../components/OrderTrackerModal';

const OrderSuccessPage = () => {
  const { orderNumber } = useParams();
  const [order, setOrder] = useState(null);
  const [copied, setCopied] = useState(false);
  const [trackerOpen, setTrackerOpen] = useState(false);

  useEffect(() => {
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.5 }
    });

    const fetchOrder = async () => {
      try {
        const res = await orderService.getOrderByNumber(orderNumber);
        if (res.success && res.data) {
          setOrder(res.data);
        }
      } catch (err) {
        console.error('Order load error', err);
      }
    };
    if (orderNumber) fetchOrder();
  }, [orderNumber]);

  const handleCopy = () => {
    if (navigator.clipboard && orderNumber) {
      navigator.clipboard.writeText(orderNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-8">
      {/* Success Badge */}
      <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 mx-auto flex items-center justify-center shadow-xl shadow-emerald-950/40">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
          Order Dispatched to Kitchen
        </span>
        <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-stone-100">
          Thank You For Dining With Us
        </h1>
        <p className="text-sm text-stone-400 max-w-md mx-auto">
          Our culinary brigade has started handcrafting your gourmet dishes with precision.
        </p>
      </div>

      {/* Tracking Code Pill Box */}
      <div className="max-w-md mx-auto bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <span className="text-xs text-stone-400 font-medium">Tracking Code</span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-base font-bold text-amber-400">{orderNumber}</span>
            <button
              onClick={handleCopy}
              className="p-1 text-stone-400 hover:text-stone-200 cursor-pointer"
              title="Copy code"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-300">
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Estimated Kitchen & Delivery:</span>
          </span>
          <span className="font-bold text-amber-300">
            {order?.estimatedDeliveryMins || 35} Minutes
          </span>
        </div>

        {order && (
          <div className="pt-3 border-t border-stone-800 text-left text-xs space-y-1.5 text-stone-400">
            <div className="flex justify-between">
              <span>Customer:</span>
              <span className="text-stone-200 font-medium">{order.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span>Fulfillment:</span>
              <span className="text-stone-200 font-medium">{order.orderType}</span>
            </div>
            <div className="flex justify-between font-bold text-stone-100 pt-1">
              <span>Total:</span>
              <span className="text-amber-400">₹{order.totalAmount}</span>
            </div>
            <p className="pt-2 text-amber-300">Payment is pending. No payment provider is connected and no charge was made.</p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <button
          onClick={() => setTrackerOpen(true)}
          className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-amber-950/60 cursor-pointer transition-all hover:scale-105"
        >
          <Compass className="w-4 h-4" />
          <span>Track Order Status</span>
        </button>

        <Link
          to="/menu"
          className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-stone-900 border border-stone-800 hover:border-amber-500 text-stone-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <UtensilsCrossed className="w-4 h-4" />
          <span>Explore More Dishes</span>
        </Link>
      </div>

      <div className="pt-8 text-xs text-stone-500 flex items-center justify-center gap-2">
        <Phone className="w-3.5 h-3.5 text-amber-500" />
        <span>Need assistance? Call Chef Concierge: +91 98765 43210</span>
      </div>

      {/* Tracker Modal */}
      <OrderTrackerModal
        isOpen={trackerOpen}
        onClose={() => setTrackerOpen(false)}
        initialOrderNumber={orderNumber}
      />
    </div>
  );
};

export default OrderSuccessPage;
