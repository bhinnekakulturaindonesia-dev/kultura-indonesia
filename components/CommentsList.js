'use client';

import { useState, useEffect } from 'react';

export default function CommentsList({ contentType, contentSlug }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, [contentType, contentSlug]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/comments?type=${contentType}&slug=${contentSlug}&status=approved`);
      const data = await res.json();
      setComments(data.comments || []);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="text-center text-gray-500">Memuat komentar...</div>
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <p className="text-center text-gray-500">Belum ada komentar. Jadilah yang pertama berkomentar!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold mb-6">
        Komentar ({comments.length})
      </h3>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
            <div className="flex items-start gap-3">
              {/* Avatar */}
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold text-sm">
                  {comment.author_name.charAt(0).toUpperCase()}
                </span>
              </div>

              {/* Comment Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-gray-900">
                    {comment.author_name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatDate(comment.created_at)}
                  </span>
                </div>

                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                  {comment.comment_text}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
