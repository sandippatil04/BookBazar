import { Link } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-xl shadow-emerald-200">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>

        <h1 className="mt-8 text-3xl font-bold text-gray-900">Order Confirmed!</h1>
        <p className="mt-3 text-gray-500 leading-relaxed">
          Your order has been placed successfully. You will receive a confirmation email shortly.
        </p>

        <div className="mt-8 p-5 bg-white rounded-2xl border border-gray-100">
          <div className="flex items-center gap-3">
            <Package className="w-5 h-5 text-emerald-500" />
            <span className="text-sm text-gray-600">Your books will be shipped within 3-5 business days</span>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/orders"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg shadow-emerald-200"
          >
            View Orders
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
