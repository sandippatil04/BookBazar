import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, BookOpen, ArrowLeft } from 'lucide-react';
import API from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function AddBookPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    author: '',
    price: '',
    selling_price: '',
    condition: 'Good',
    description: '',
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('author', form.author);
      formData.append('price', form.price);
      formData.append('selling_price', form.selling_price);
      formData.append('condition', form.condition);
      formData.append('description', form.description);
      if (image) formData.append('image', image);

      await API.post('/books', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to add book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pt-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <h1 className="text-3xl font-bold text-gray-900">Sell a Book</h1>
        <p className="mt-1 text-gray-400">List your book on the marketplace</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="p-6 bg-white rounded-2xl border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-emerald-500" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Book Details</h2>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Title</label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all"
                    placeholder="Book title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Author</label>
                  <input
                    type="text"
                    required
                    value={form.author}
                    onChange={(e) => setForm({ ...form, author: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all"
                    placeholder="Author name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Original Price ($)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Selling Price ($)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={form.selling_price}
                    onChange={(e) => setForm({ ...form, selling_price: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Condition</label>
                <select
                  value={form.condition}
                  onChange={(e) => setForm({ ...form, condition: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all bg-white"
                >
                  <option>Like New</option>
                  <option>Good</option>
                  <option>Fair</option>
                  <option>Worn</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all resize-none"
                  placeholder="Describe the book's condition, edition, etc."
                />
              </div>
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                <Upload className="w-5 h-5 text-emerald-500" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Book Image</h2>
            </div>

            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/30 transition-all"
              >
                {preview ? (
                  <img src={preview} alt="Preview" className="w-full h-full object-contain p-4" />
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-gray-300" />
                    <p className="mt-2 text-sm text-gray-400">Click to upload an image</p>
                    <p className="text-xs text-gray-300 mt-1">JPG, PNG, WebP up to 5MB</p>
                  </>
                )}
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl hover:from-emerald-600 hover:to-teal-600 transition-all shadow-xl shadow-emerald-200 disabled:opacity-50"
          >
            {loading ? 'Listing Book...' : 'List Book for Sale'}
          </button>
        </form>
      </div>
    </div>
  );
}
