import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Smartphone, Truck, Shield, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import API from '../api/client';

const paymentMethods = [
  { id: 'card', label: 'Credit / Debit Card', icon: CreditCard, desc: 'Visa, Mastercard, RuPay' },
  { id: 'upi', label: 'UPI', icon: Smartphone, desc: 'Google Pay, PhonePe, Paytm' },
  { id: 'cod', label: 'Cash on Delivery', icon: Truck, desc: 'Pay when you receive' },
];

export default function PaymentPage() {
  const { user } = useAuth();
  const { cart, cartTotal } = useCart();
  const navigate = useNavigate();
  const [method, setMethod] = useState('card');
  const [processing, setProcessing] = useState(false);

  if (!user || cart.length === 0) {
    navigate('/cart');
    return null;
  }

  const handlePay = async () => {
    setProcessing(true);
    try {
      await new Promise((r) => setTimeout(r, 2000));
      await API.post('/orders', {
        items: cart,
        payment_method: method,
        total: cartTotal,
      });
      navigate('/success');
    } catch (err) {
      alert(err.response?.data?.error || 'Payment failed');
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pt-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900">Payment</h1>
        <p className="mt-1 text-gray-400">Choose your payment method</p>

        <div className="mt-8 space-y-3">
          {paymentMethods.map((pm) => {
            const Icon = pm.icon;
            const selected = method === pm.id;
            return (
              <button
                key={pm.id}
                onClick={() => setMethod(pm.id)}
                className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-left ${
                  selected
                    ? 'border-emerald-500 bg-emerald-50/50 shadow-sm'
                    : 'border-gray-100 bg-white hover:border-gray-200'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                    selected ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-semibold ${selected ? 'text-emerald-700' : 'text-gray-900'}`}>
                    {pm.label}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{pm.desc}</p>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    selected ? 'border-emerald-500' : 'border-gray-200'
                  }`}
                >
                  {selected && <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-8 p-6 bg-white rounded-2xl border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500">Order Total</span>
            <span className="text-2xl font-bold text-gray-900">${cartTotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
            <Shield className="w-3.5 h-3.5" />
            Secure payment powered by BookBazar
          </div>
        </div>

        <button
          onClick={handlePay}
          disabled={processing}
          className="mt-6 w-full inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl hover:from-emerald-600 hover:to-teal-600 transition-all shadow-xl shadow-emerald-200 disabled:opacity-70"
        >
          {processing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing Payment...
            </>
          ) : (
            `Pay $${cartTotal.toFixed(2)}`
          )}
        </button>
      </div>
    </div>
  );
}
