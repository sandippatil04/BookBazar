import { Link } from 'react-router-dom';
import { BookOpen, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">BookBazar</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your trusted marketplace for second-hand books. Give books a second life, save money, and help the planet.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2.5">
              <Link to="/" className="text-sm hover:text-emerald-400 transition-colors">Home</Link>
              <Link to="/about" className="text-sm hover:text-emerald-400 transition-colors">About Us</Link>
              <Link to="/contact" className="text-sm hover:text-emerald-400 transition-colors">Contact</Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Account</h3>
            <div className="flex flex-col gap-2.5">
              <Link to="/cart" className="text-sm hover:text-emerald-400 transition-colors">Cart</Link>
              <Link to="/orders" className="text-sm hover:text-emerald-400 transition-colors">Orders</Link>
              <Link to="/login" className="text-sm hover:text-emerald-400 transition-colors">Sign In</Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-emerald-400" />
                hello@bookbazar.com
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-emerald-400" />
                +91 8605081372
              </div>
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 text-emerald-400 mt-0.5" />
                Nashik, India
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-sm text-gray-500">&copy; 2026 BookBazar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
