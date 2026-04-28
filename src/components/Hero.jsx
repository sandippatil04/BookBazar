import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-emerald-50/30">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-100/30 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 mb-6">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span className="text-sm font-medium text-emerald-700">Second-Hand Book Marketplace</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight leading-[1.1]">
            Give Books a
            <span className="block bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              Second Life
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-gray-500 leading-relaxed max-w-xl">
            Buy and sell pre-loved books at unbeatable prices. Save money, discover rare finds, and help the planet one book at a time.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <button
  onClick={() => {
    const section = document.getElementById("books");
    section?.scrollIntoView({ behavior: "smooth" });
  }}
  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl hover:from-emerald-600 hover:to-teal-600 transition-all shadow-xl shadow-emerald-200 hover:shadow-emerald-300 hover:-translate-y-0.5"
>
  Browse Books
</button>
            <Link
              to="/about"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-gray-700 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 hover:border-gray-300 transition-all"
            >
              Learn More
            </Link>
          </div>

          <div className="mt-14 flex items-center gap-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              Free listing
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-teal-400" />
              Secure payments
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-400" />
              Eco-friendly
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
