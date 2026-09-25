'use client';

import { useState } from 'react';

export default function CommentForm({ contentType, contentSlug }) {
  const [formData, setFormData] = useState({
    authorName: '',
    authorEmail: '',
    commentText: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.authorName || !formData.authorEmail || !formData.commentText) {
      setMessage('Semua field harus diisi');
      setIsError(true);
      return;
    }

    setLoading(true);
    setMessage('');
    setIsError(false);

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contentType,
          contentSlug,
          ...formData
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || 'Komentar berhasil dikirim!');
        setIsError(false);
        setFormData({
          authorName: '',
          authorEmail: '',
          commentText: ''
        });
      } else {
        setMessage(data.error || 'Gagal mengirim komentar');
        setIsError(true);
      }
    } catch (error) {
      console.error('Comment error:', error);
      setMessage('Terjadi kesalahan. Silakan coba lagi.');
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold mb-4">Tulis Komentar</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="authorName" className="block text-sm font-medium text-gray-700 mb-1">
              Nama <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="authorName"
              name="authorName"
              value={formData.authorName}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              required
            />
          </div>

          <div>
            <label htmlFor="authorEmail" className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="authorEmail"
              name="authorEmail"
              value={formData.authorEmail}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              required
            />
          </div>
        </div>

        {/* Comment Text */}
        <div>
          <label htmlFor="commentText" className="block text-sm font-medium text-gray-700 mb-1">
            Komentar <span className="text-red-500">*</span>
          </label>
          <textarea
            id="commentText"
            name="commentText"
            value={formData.commentText}
            onChange={handleChange}
            disabled={loading}
            rows={4}
            maxLength={1000}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
            placeholder="Tulis komentar Anda..."
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            {formData.commentText.length}/1000 karakter
          </p>
        </div>

        {/* Message */}
        {message && (
          <div className={`p-3 rounded-lg text-sm ${
            isError ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800'
          }`}>
            {message}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Mengirim...' : 'Kirim Komentar'}
        </button>

        <p className="text-xs text-gray-500">
          Komentar Anda akan ditinjau oleh admin sebelum dipublikasikan.
        </p>
      </form>
    </div>
  );
}
