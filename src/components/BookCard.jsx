import { Link } from 'react-router-dom';
import { Tag, BookOpen } from 'lucide-react';

export default function BookCard({ book }) {
  const discount = Math.round(((book.price - book.selling_price) / book.price) * 100);
  const imageUrl = book.image
    ? `/uploads/${book.image}`
    : null;

  return (
    <Link
      to={`/book/${book.id}`}
      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative aspect-[3/4] bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <BookOpen className="w-12 h-12 text-gray-300" />
          </div>
        )}
        {discount > 0 && (
          <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold rounded-lg shadow-lg">
            <Tag className="w-3 h-3" />
            {discount}% OFF
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-base font-semibold text-gray-900 truncate group-hover:text-emerald-600 transition-colors">
          {book.title}
        </h3>
        <p className="mt-1 text-sm text-gray-400 truncate">{book.author}</p>

        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-xl font-bold text-gray-900">
            ${Number(book.selling_price).toFixed(2)}
          </span>
          {discount > 0 && (
            <span className="text-sm text-gray-400 line-through">
              ${Number(book.price).toFixed(2)}
            </span>
          )}
        </div>

        {book.condition_type && (
          <div className="mt-3 inline-flex px-2.5 py-0.5 rounded-lg bg-gray-50 text-xs font-medium text-gray-500">
            {book.condition_type}
          </div>
        )}
      </div>
    </Link>
  );
}
