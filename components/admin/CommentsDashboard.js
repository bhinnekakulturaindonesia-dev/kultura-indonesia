'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function CommentsDashboard() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('pending'); // pending, approved, rejected, spam, all

  useEffect(() => {
    fetchComments();
  }, [filter]);

  const fetchComments = async () => {
    try {
      setLoading(true);

      let query = supabase
        .from('comments')
        .select('*')
        .order('created_at', { ascending: false });

      if (filter !== 'all') {
        query = query.eq('status', filter);
      }

      const { data, error } = await query;

      if (error) throw error;

      setComments(data || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
      alert('Gagal memuat komentar');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      const { error } = await supabase
        .from('comments')
        .update({
          status: 'approved',
          approved_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;

      alert('Komentar berhasil disetujui');
      fetchComments();
    } catch (error) {
      console.error('Error approving comment:', error);
      alert('Gagal menyetujui komentar');
    }
  };

  const handleReject = async (id) => {
    if (!confirm('Yakin ingin menolak komentar ini?')) return;

    try {
      const { error } = await supabase
        .from('comments')
        .update({ status: 'rejected' })
        .eq('id', id);

      if (error) throw error;

      alert('Komentar ditolak');
      fetchComments();
    } catch (error) {
      console.error('Error rejecting comment:', error);
      alert('Gagal menolak komentar');
    }
  };

  const handleMarkSpam = async (id) => {
    try {
      const { error } = await supabase
        .from('comments')
        .update({ status: 'spam' })
        .eq('id', id);

      if (error) throw error;

      alert('Komentar ditandai sebagai spam');
      fetchComments();
    } catch (error) {
      console.error('Error marking spam:', error);
      alert('Gagal menandai spam');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus komentar ini secara permanen?')) return;

    try {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', id);

      if (error) throw error;

      alert('Komentar berhasil dihapus');
      fetchComments();
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('Gagal menghapus komentar');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getContentUrl = (type, slug) => {
    const urls = {
      publikasi: `/publikasi/${slug}`,
      kegiatan: `/kegiatan/${slug}`,
      artikel: `/artikel/${slug}`,
      portofolio: `/portofolio/${slug}`
    };
    return urls[type] || '#';
  };

  const pendingCount = comments.filter(c => c.status === 'pending').length;
  const approvedCount = comments.filter(c => c.status === 'approved').length;
  const rejectedCount = comments.filter(c => c.status === 'rejected').length;
  const spamCount = comments.filter(c => c.status === 'spam').length;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">Memuat komentar...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Comments Moderation</h1>
        <p className="text-gray-600">Kelola dan moderasi komentar user</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-xs text-gray-600 mb-1">Pending</div>
          <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-xs text-gray-600 mb-1">Approved</div>
          <div className="text-2xl font-bold text-green-600">{approvedCount}</div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-xs text-gray-600 mb-1">Rejected</div>
          <div className="text-2xl font-bold text-red-600">{rejectedCount}</div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-xs text-gray-600 mb-1">Spam</div>
          <div className="text-2xl font-bold text-gray-600">{spamCount}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              filter === 'pending'
                ? 'bg-yellow-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Pending ({pendingCount})
          </button>
          <button
            onClick={() => setFilter('approved')}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              filter === 'approved'
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Approved ({approvedCount})
          </button>
          <button
            onClick={() => setFilter('rejected')}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              filter === 'rejected'
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Rejected ({rejectedCount})
          </button>
          <button
            onClick={() => setFilter('spam')}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              filter === 'spam'
                ? 'bg-gray-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Spam ({spamCount})
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All ({comments.length})
          </button>
        </div>
      </div>

      {/* Comments List */}
      {comments.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
          Tidak ada komentar {filter !== 'all' && `dengan status ${filter}`}
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-white rounded-lg shadow p-6">
              {/* Comment Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold text-gray-900">
                      {comment.author_name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {comment.author_email}
                    </span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      comment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      comment.status === 'approved' ? 'bg-green-100 text-green-800' :
                      comment.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {comment.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>📅 {formatDate(comment.created_at)}</span>
                    <Link
                      href={getContentUrl(comment.content_type, comment.content_slug)}
                      target="_blank"
                      className="text-blue-600 hover:underline"
                    >
                      {comment.content_type}: {comment.content_slug}
                    </Link>
                  </div>
                </div>
              </div>

              {/* Comment Text */}
              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700 whitespace-pre-wrap">
                  {comment.comment_text}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                {comment.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleApprove(comment.id)}
                      className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                    >
                      ✓ Approve
                    </button>
                    <button
                      onClick={() => handleReject(comment.id)}
                      className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                    >
                      × Reject
                    </button>
                    <button
                      onClick={() => handleMarkSpam(comment.id)}
                      className="px-4 py-2 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      🚫 Spam
                    </button>
                  </>
                )}
                {comment.status === 'approved' && (
                  <button
                    onClick={() => handleReject(comment.id)}
                    className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Unapprove
                  </button>
                )}
                {comment.status !== 'pending' && comment.status !== 'approved' && (
                  <button
                    onClick={() => handleApprove(comment.id)}
                    className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Approve
                  </button>
                )}
                <button
                  onClick={() => handleDelete(comment.id)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300 transition-colors ml-auto"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
