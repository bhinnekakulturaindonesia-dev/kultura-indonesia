'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import AdminLayout from '@/components/admin/AdminLayout';
import Link from 'next/link';

export default function SettingsPage() {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('tentang-kami');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .order('setting_key');

      if (error) throw error;

      // Convert array to object for easier access
      const settingsObj = {};
      data.forEach(item => {
        settingsObj[item.setting_key] = item.setting_value;
      });

      setSettings(settingsObj);
    } catch (error) {
      console.error('Error fetching settings:', error);
      alert('Gagal memuat settings: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      // Update each setting
      const updates = Object.entries(settings).map(([key, value]) => 
        supabase
          .from('site_settings')
          .update({ setting_value: value })
          .eq('setting_key', key)
      );

      const results = await Promise.all(updates);
      
      // Check for errors
      const errors = results.filter(r => r.error);
      if (errors.length > 0) {
        throw new Error(errors[0].error.message);
      }

      alert('Settings berhasil disimpan! ✅');
      fetchSettings(); // Refresh
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Gagal menyimpan settings: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-600">Memuat settings...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div>
        {/* Header */}
        <div className="mb-6">
          <Link 
            href="/admin"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
          >
            <span className="mr-2">←</span>
            Kembali ke Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Site Settings</h1>
          <p className="text-gray-600 mt-2">Edit konten halaman Tentang Kami dan Footer</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('tentang-kami')}
              className={`px-6 py-3 font-medium text-sm transition-colors ${
                activeTab === 'tentang-kami'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📄 Tentang Kami
            </button>
            <button
              onClick={() => setActiveTab('footer')}
              className={`px-6 py-3 font-medium text-sm transition-colors ${
                activeTab === 'footer'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              🔗 Footer & Kontak
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow p-6">
          {activeTab === 'tentang-kami' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Konten Halaman Tentang Kami</h2>

              {/* Hero Section */}
              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Hero Section</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Judul Utama
                    </label>
                    <input
                      type="text"
                      value={settings.tentang_hero_title || ''}
                      onChange={(e) => handleChange('tentang_hero_title', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Halo, Kami Studi Kultura Indonesia"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subtitle / Deskripsi
                    </label>
                    <textarea
                      value={settings.tentang_hero_subtitle || ''}
                      onChange={(e) => handleChange('tentang_hero_subtitle', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Sekelompok peneliti muda yang..."
                    />
                  </div>
                </div>
              </div>

              {/* Fokus Riset */}
              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Fokus Riset</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Judul Section
                    </label>
                    <input
                      type="text"
                      value={settings.fokus_riset_title || ''}
                      onChange={(e) => handleChange('fokus_riset_title', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Studi Budaya Card */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Card 1: Studi Budaya</p>
                    <input
                      type="text"
                      value={settings.fokus_studi_budaya_title || ''}
                      onChange={(e) => handleChange('fokus_studi_budaya_title', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-2"
                      placeholder="Studi Budaya"
                    />
                    <textarea
                      value={settings.fokus_studi_budaya_desc || ''}
                      onChange={(e) => handleChange('fokus_studi_budaya_desc', e.target.value)}
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      placeholder="Deskripsi..."
                    />
                  </div>

                  {/* Toleransi Card */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Card 2: Toleransi & Keragaman</p>
                    <input
                      type="text"
                      value={settings.fokus_toleransi_title || ''}
                      onChange={(e) => handleChange('fokus_toleransi_title', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-2"
                      placeholder="Toleransi & Keragaman"
                    />
                    <textarea
                      value={settings.fokus_toleransi_desc || ''}
                      onChange={(e) => handleChange('fokus_toleransi_desc', e.target.value)}
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      placeholder="Deskripsi..."
                    />
                  </div>

                  {/* Metodologi Card */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Card 3: Metodologi Digital</p>
                    <input
                      type="text"
                      value={settings.fokus_metodologi_title || ''}
                      onChange={(e) => handleChange('fokus_metodologi_title', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-2"
                      placeholder="Metodologi Digital"
                    />
                    <textarea
                      value={settings.fokus_metodologi_desc || ''}
                      onChange={(e) => handleChange('fokus_metodologi_desc', e.target.value)}
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      placeholder="Deskripsi..."
                    />
                  </div>
                </div>
              </div>

              {/* Siapa Kami */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Siapa Kami Section</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Judul
                    </label>
                    <input
                      type="text"
                      value={settings.siapa_kami_title || ''}
                      onChange={(e) => handleChange('siapa_kami_title', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Deskripsi
                    </label>
                    <textarea
                      value={settings.siapa_kami_desc || ''}
                      onChange={(e) => handleChange('siapa_kami_desc', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Note */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>📸 Foto Tim & Galeri:</strong> Upload foto di <Link href="/admin/media" className="underline font-semibold">Media Library</Link> dengan kategori "Tim Kami" atau "Galeri Dokumentasi"
                </p>
              </div>
            </div>
          )}

          {activeTab === 'footer' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Footer & Kontak</h2>

              {/* Footer Content */}
              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Konten Footer</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Judul Footer
                    </label>
                    <input
                      type="text"
                      value={settings.footer_title || ''}
                      onChange={(e) => handleChange('footer_title', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Deskripsi
                    </label>
                    <textarea
                      value={settings.footer_description || ''}
                      onChange={(e) => handleChange('footer_description', e.target.value)}
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Newsletter Text
                    </label>
                    <input
                      type="text"
                      value={settings.footer_newsletter_text || ''}
                      onChange={(e) => handleChange('footer_newsletter_text', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Copyright Text
                    </label>
                    <input
                      type="text"
                      value={settings.footer_copyright || ''}
                      onChange={(e) => handleChange('footer_copyright', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Kontak</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={settings.contact_email || ''}
                    onChange={(e) => handleChange('contact_email', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="riset@kulturaindonesia.or.id"
                  />
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Media Sosial</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      📷 Instagram
                    </label>
                    <input
                      type="url"
                      value={settings.social_instagram || ''}
                      onChange={(e) => handleChange('social_instagram', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://instagram.com/kulturaindonesia"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      𝕏 Twitter / X
                    </label>
                    <input
                      type="url"
                      value={settings.social_twitter || ''}
                      onChange={(e) => handleChange('social_twitter', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://twitter.com/kulturaindonesia"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ▶️ YouTube
                    </label>
                    <input
                      type="url"
                      value={settings.social_youtube || ''}
                      onChange={(e) => handleChange('social_youtube', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://youtube.com/@kulturaindonesia"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      📘 Facebook (Opsional)
                    </label>
                    <input
                      type="url"
                      value={settings.social_facebook || ''}
                      onChange={(e) => handleChange('social_facebook', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://facebook.com/kulturaindonesia"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      💼 LinkedIn (Opsional)
                    </label>
                    <input
                      type="url"
                      value={settings.social_linkedin || ''}
                      onChange={(e) => handleChange('social_linkedin', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://linkedin.com/company/kulturaindonesia"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="mt-8 pt-6 border-t flex justify-end gap-4">
            <button
              onClick={() => fetchSettings()}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              disabled={saving}
            >
              Reset
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Menyimpan...' : '💾 Simpan Perubahan'}
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
