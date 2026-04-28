import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { user } = useAuth();
  const { cart, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center">
        <ShoppingBag className="w-16 h-16 text-gray-200" />
        <p className="mt-4 text-lg text-gray-400">Please sign in to view your cart</p>
        <Link to="/login" className="mt-4 px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl">
          Sign In
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center">
        <ShoppingBag className="w-16 h-16 text-gray-200" />
        <p className="mt-4 text-lg text-gray-400">Your cart is empty</p>
        <Link to="/" className="mt-4 px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl">
          Browse Books
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
        <p className="mt-1 text-gray-400">{cart.length} item{cart.length !== 1 ? 's' : ''}</p>

        <div className="mt-8 space-y-4">
          {cart.map((item) => {
            const imageUrl = item.image ? `/uploads/${item.image}` : null;
            const discount = Math.round(((item.price - item.selling_price) / item.price) * 100);

            return (
              <div
                key={item.cart_id}
                className="flex gap-5 p-5 bg-white rounded-2xl border border-gray-100 hover:shadow-md transition-shadow"
              >
                <Link to={`/book/${item.id}`} className="flex-shrink-0">
                  <div className="w-20 h-28 sm:w-24 sm:h-32 rounded-xl overflow-hidden bg-gray-50">
                    {imageUrl ? (
                      <img src={imageUrl} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-gray-300" />
                      </div>
                    )}
                  </div>
                </Link>

                <div className="flex-1 min-w-0">
                  <Link to={`/book/${item.id}`}>
                    <h3 className="text-base font-semibold text-gray-900 truncate hover:text-emerald-600 transition-colors">
                      {item.title}
                    </h3>
                  </Link>
                  <p className="mt-0.5 text-sm text-gray-400">{item.author}</p>
                  {discount > 0 && (
                    <span className="inline-flex mt-2 px-2 py-0.5 text-xs font-medium text-emerald-600 bg-emerald-50 rounded-lg">
                      {discount}% OFF
                    </span>
                  )}
                </div>

                <div className="flex flex-col items-end justify-between">
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">${Number(item.selling_price).toFixed(2)}</p>
                    {discount > 0 && (
                      <p className="text-sm text-gray-400 line-through">${Number(item.price).toFixed(2)}</p>
                    )}
                  </div>
                  <button
                    onClick={() => removeFromCart(item.cart_id)}
                    className="p-2 rounded-xl hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 p-6 bg-white rounded-2xl border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-500">Subtotal</span>
            <span className="text-lg font-bold text-gray-900">${cartTotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
            <span className="text-gray-500">Shipping</span>
            <span className="text-sm font-medium text-emerald-600">Free</span>
          </div>
          <div className="flex items-center justify-between mb-8">
            <span className="text-lg font-semibold text-gray-900">Total</span>
            <span className="text-2xl font-bold text-gray-900">${cartTotal.toFixed(2)}</span>
          </div>

          <button
            onClick={() => navigate('/payment')}
            className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl hover:from-emerald-600 hover:to-teal-600 transition-all shadow-xl shadow-emerald-200"
          >
            Proceed to Checkout
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
