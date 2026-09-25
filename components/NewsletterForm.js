'use client';

import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setMessage('Mohon masukkan email yang valid');
      setIsError(true);
      return;
    }

    setLoading(true);
    setMessage('');
    setIsError(false);

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || 'Berhasil berlangganan!');
        setIsError(false);
        setEmail('');
      } else {
        setMessage(data.error || 'Terjadi kesalahan');
        setIsError(true);
      }
    } catch (error) {
      console.error('Newsletter error:', error);
      setMessage('Terjadi kesalahan. Silakan coba lagi.');
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Anda"
          disabled={loading}
          className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {loading ? 'Mengirim...' : 'Berlangganan'}
        </button>
      </form>

      {message && (
        <p className={`mt-3 text-sm ${isError ? 'text-red-600' : 'text-green-600'}`}>
          {message}
        </p>
      )}

      <p className="mt-3 text-xs text-gray-500">
        Dapatkan update publikasi dan kegiatan terbaru kami melalui email.
      </p>
    </div>
  );
}
