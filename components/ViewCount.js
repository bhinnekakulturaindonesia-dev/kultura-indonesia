'use client';

import { useState, useEffect } from 'react';

export default function ViewCount({ slug, type }) {
  const [views, setViews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchViews();
  }, [slug, type]);

  const fetchViews = async () => {
    try {
      const res = await fetch(`/api/analytics?slug=${slug}&type=${type}`);
      const data = await res.json();
      setViews(data.totalViews || 0);
    } catch (error) {
      console.error('Failed to fetch views:', error);
      setViews(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <span className="text-sm text-gray-500">
        👁️ ...
      </span>
    );
  }

  if (views === null) {
    return null;
  }

  return (
    <span className="text-sm text-gray-500">
      👁️ {views.toLocaleString('id-ID')} views
    </span>
  );
}
