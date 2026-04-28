import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Tag, BookOpen, User } from 'lucide-react';
import API from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function BookDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    try {
      const { data } = await API.get(`/books/${id}`);
      setBook(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!user) { navigate('/login'); return; }
    setAdding(true);
    try {
      await addToCart(book.id);
      navigate('/cart');
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to add to cart');
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center">
        <BookOpen className="w-16 h-16 text-gray-200" />
        <p className="mt-4 text-gray-400">Book not found</p>
        <Link to="/" className="mt-4 text-emerald-600 hover:underline">Go back home</Link>
      </div>
    );
  }

  const discount = Math.round(((book.price - book.selling_price) / book.price) * 100);
  const imageUrl = book.image
  ? `${import.meta.env.VITE_API_URL}/uploads/${book.image}`
  : null;

  return (
    <div className="min-h-screen bg-gray-50/50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0 bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
            {imageUrl ? (
              <img src={imageUrl} alt={book.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <BookOpen className="w-20 h-20 text-gray-200" />
              </div>
            )}
            {discount > 0 && (
              <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-bold rounded-xl shadow-lg">
                <Tag className="w-4 h-4" />
                {discount}% OFF
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <div className="flex-1">
              <div className="inline-flex px-3 py-1 rounded-lg bg-emerald-50 text-xs font-medium text-emerald-700 mb-4">
                {book.condition_type || 'Good'} Condition
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{book.title}</h1>
              <p className="mt-2 text-lg text-gray-400">by {book.author}</p>

              {book.seller_name && (
                <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                  <User className="w-4 h-4" />
                  Sold by {book.seller_name}
                </div>
              )}

              {book.description && (
                <p className="mt-6 text-gray-500 leading-relaxed">{book.description}</p>
              )}

              <div className="mt-8 p-6 bg-white rounded-2xl border border-gray-100">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-gray-900">
                    ${Number(book.selling_price).toFixed(2)}
                  </span>
                  {discount > 0 && (
                    <>
                      <span className="text-lg text-gray-400 line-through">
                        ${Number(book.price).toFixed(2)}
                      </span>
                      <span className="text-sm font-semibold text-emerald-600">
                        Save ${(Number(book.price) - Number(book.selling_price)).toFixed(2)}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddToCart}
                disabled={adding}
                className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl hover:from-emerald-600 hover:to-teal-600 transition-all shadow-xl shadow-emerald-200 hover:shadow-emerald-300 disabled:opacity-50"
              >
                <ShoppingCart className="w-5 h-5" />
                {adding ? 'Adding...' : 'Add to Cart'}
              </button>
              <button
                onClick={() => {
                  if (!user) { navigate('/login'); return; }
                  addToCart(book.id).then(() => navigate('/payment'));
                }}
                className="flex-1 inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-gray-700 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
