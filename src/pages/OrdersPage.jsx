import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, BookOpen, Calendar, CreditCard } from 'lucide-react';
import API from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      const { data } = await API.get('/orders');
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center">
        <Package className="w-16 h-16 text-gray-200" />
        <p className="mt-4 text-lg text-gray-400">Please sign in to view orders</p>
        <Link to="/login" className="mt-4 px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl">
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
        <p className="mt-1 text-gray-400">Track and manage your purchases</p>

        {loading ? (
          <div className="mt-8 space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse p-6 bg-white rounded-2xl">
                <div className="h-4 bg-gray-100 rounded w-1/4" />
                <div className="mt-4 h-3 bg-gray-100 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="mt-16 text-center">
            <Package className="w-16 h-16 text-gray-200 mx-auto" />
            <p className="mt-4 text-lg text-gray-400">No orders yet</p>
            <Link to="/" className="mt-4 inline-block px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="p-6 bg-white rounded-2xl border border-gray-100">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                      <Package className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Order #{order.id}</p>
                      <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
                        <Calendar className="w-3 h-3" />
                        {new Date(order.created_at).toLocaleDateString('en-US', {
                          year: 'numeric', month: 'short', day: 'numeric',
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <CreditCard className="w-3 h-3" />
                      {order.payment_method}
                    </div>
                    <span className="inline-flex px-3 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-lg">
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  {order.items.map((item) => {
                    const imageUrl = item.image ? `/uploads/${item.image}` : null;
                    return (
                      <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                        <div className="w-12 h-16 rounded-lg overflow-hidden bg-white flex-shrink-0">
                          {imageUrl ? (
                            <img src={imageUrl} alt={item.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <BookOpen className="w-4 h-4 text-gray-300" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                          <p className="text-xs text-gray-400">{item.author}</p>
                        </div>
                        <p className="text-sm font-semibold text-gray-900">${Number(item.price).toFixed(2)}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-sm text-gray-500">Total</span>
                  <span className="text-lg font-bold text-gray-900">${Number(order.total).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
