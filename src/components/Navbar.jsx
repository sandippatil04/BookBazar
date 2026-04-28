import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { BookOpen, ShoppingCart, Menu, X, User, LogOut, Plus } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200 group-hover:shadow-emerald-300 transition-shadow">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              BookBazar
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors">Home</Link>
            <Link to="/about" className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors">About</Link>
            <Link to="/contact" className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors">Contact</Link>
            {user && (
              <Link to="/orders" className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors">Orders</Link>
            )}
            {user && (
              <Link to="/sell" className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors">Sell Book</Link>
            )}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/cart" className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
              <ShoppingCart className="w-5 h-5 text-gray-600" />
              {cart.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg">
                  {cart.length}
                </span>
              )}
            </Link>
            {user ? (
              <div className="flex items-center gap-3">
                <Link to="/sell" className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors">
                  <Plus className="w-3.5 h-3.5" />
                  Sell
                </Link>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-50">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                </div>
                <button onClick={handleLogout} className="p-2 rounded-xl hover:bg-red-50 transition-colors group">
                  <LogOut className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors">
                  Sign In
                </Link>
                <Link to="/register" className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg shadow-emerald-200 hover:shadow-emerald-300">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-xl hover:bg-gray-100">
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-gray-100 px-4 pb-4">
          <div className="flex flex-col gap-2 pt-2">
            <Link to="/" onClick={() => setMenuOpen(false)} className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50">Home</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)} className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50">About</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)} className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50">Contact</Link>
            {user && (
              <Link to="/orders" onClick={() => setMenuOpen(false)} className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50">Orders</Link>
            )}
            {user && (
              <Link to="/sell" onClick={() => setMenuOpen(false)} className="px-4 py-2.5 rounded-xl text-sm font-medium text-emerald-600 bg-emerald-50 hover:bg-emerald-100">Sell a Book</Link>
            )}
            <Link to="/cart" onClick={() => setMenuOpen(false)} className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" /> Cart {cart.length > 0 && `(${cart.length})`}
            </Link>
            <div className="border-t border-gray-100 pt-2 mt-1">
              {user ? (
                <button onClick={handleLogout} className="w-full px-4 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 text-left">Sign Out</button>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link to="/login" onClick={() => setMenuOpen(false)} className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50">Sign In</Link>
                  <Link to="/register" onClick={() => setMenuOpen(false)} className="px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-500 text-center">Sign Up</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
