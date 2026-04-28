import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
            Get in <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Have a question or feedback? We would love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          <div className="lg:col-span-2 space-y-4">
            {[
              { icon: Mail, label: 'Email', value: 'hello@bookbazar.com' },
              { icon: Phone, label: 'Phone', value: '+91 8605081372' },
              { icon: MapPin, label: 'Address', value: 'Nashik, Maharashtra, India' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">{item.label}</p>
                    <p className="mt-1 text-sm font-medium text-gray-900">{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="p-8 bg-white rounded-2xl border border-gray-100">
              <div className="flex items-center gap-2 mb-6">
                <MessageCircle className="w-5 h-5 text-emerald-500" />
                <h2 className="text-lg font-semibold text-gray-900">Send us a message</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all resize-none"
                    placeholder="How can we help?"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg shadow-emerald-200"
              >
                <Send className="w-4 h-4" />
                {sent ? 'Message Sent!' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
