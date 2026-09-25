import { supabase } from '@/lib/supabase';
import Image from 'next/image';

export const metadata = {
  title: 'Tentang Kami',
};

// Fetch settings from database
async function getSettings() {
  const { data } = await supabase
    .from('site_settings')
    .select('*')
    .in('category', ['tentang-kami']);

  const settings = {};
  data?.forEach(item => {
    settings[item.setting_key] = item.setting_value;
  });

  return settings;
}

// Fetch team photos
async function getTeamPhotos() {
  const { data } = await supabase
    .from('media')
    .select('*')
    .eq('category', 'team')
    .order('created_at', { ascending: true });

  return data || [];
}

// Fetch gallery photos
async function getGalleryPhotos() {
  const { data } = await supabase
    .from('media')
    .select('*')
    .eq('category', 'gallery')
    .order('created_at', { ascending: true });

  return data || [];
}

export default async function TentangKamiPage() {
  const settings = await getSettings();
  const teamPhotos = await getTeamPhotos();
  const galleryPhotos = await getGalleryPhotos();

  return (
    <div className="bg-white dark:bg-brand-navy transition-colors">

      {/* ================= HERO SECTION ================= */}
      <section className="py-28">
        <div className="max-w-4xl mx-auto px-4 text-center">

          <p className="text-xs tracking-[6px] uppercase text-brand-blue dark:text-brand-gold mb-8">
            Siapa Kami
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mb-10 text-gray-900 dark:text-gray-100">
            {settings.tentang_hero_title || 'Tentang Studi Kultura Indonesia'}
          </h1>

          <div className="bg-gray-50 dark:bg-brand-navy-light 
                          dark:border dark:border-white/10
                          rounded-2xl p-10 shadow-sm text-left">

            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              {settings.tentang_hero_subtitle || 'Sekelompok peneliti muda yang berkomitmen untuk menghasilkan pengetahuan yang mempromosikan demokrasi dan keragaman di Indonesia.'}
            </p>

          </div>
        </div>
      </section>

      {/* ================= FOKUS RISET ================= */}
      <section className="py-24 bg-gray-50 dark:bg-brand-navy-soft transition-colors">
        <div className="max-w-6xl mx-auto px-4 text-center">

          <h2 className="text-3xl font-bold mb-14 text-gray-900 dark:text-gray-100">
            {settings.fokus_riset_title || 'Fokus Riset'}
          </h2>

          <div className="grid md:grid-cols-3 gap-12">

            {/* Studi Budaya */}
            <div className="p-8 rounded-2xl bg-white dark:bg-brand-navy-light 
                           dark:border dark:border-white/10
                           hover:shadow-lg transition duration-300">
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
                {settings.fokus_studi_budaya_title || 'Studi Budaya'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {settings.fokus_studi_budaya_desc || 'Analisis kritis dan berbasis data terhadap dinamika sosial digital dan budaya kontemporer.'}
              </p>
            </div>

            {/* Toleransi & Keragaman */}
            <div className="p-8 rounded-2xl bg-white dark:bg-brand-navy-light 
                           dark:border dark:border-white/10
                           hover:shadow-lg transition duration-300">
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
                {settings.fokus_toleransi_title || 'Toleransi & Keragaman'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {settings.fokus_toleransi_desc || 'Mengkaji wacana toleransi, pluralisme, dan isu keragaman dalam percakapan publik Indonesia.'}
              </p>
            </div>

            {/* Metodologi Digital */}
            <div className="p-8 rounded-2xl bg-white dark:bg-brand-navy-light 
                           dark:border dark:border-white/10
                           hover:shadow-lg transition duration-300">
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
                {settings.fokus_metodologi_title || 'Metodologi Digital'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {settings.fokus_metodologi_desc || 'Pengembangan dan penerapan metode penelitian digital untuk analisis media sosial dan budaya online.'}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= SIAPA KAMI ================= */}
      <section className="py-24 bg-white dark:bg-brand-navy transition-colors">
        <div className="max-w-4xl mx-auto px-4">

          <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100 text-center">
            {settings.siapa_kami_title || 'Siapa Kami'}
          </h2>

          <div className="bg-gray-50 dark:bg-brand-navy-light 
                          dark:border dark:border-white/10
                          rounded-2xl p-10 shadow-sm">
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              {settings.siapa_kami_desc || 'Studi Kultura Indonesia adalah inisiatif riset independen yang mengkaji budaya, toleransi, dan dinamika media sosial di Indonesia melalui pendekatan kritis dan berbasis data.'}
            </p>
          </div>

        </div>
      </section>

      {/* ================= TIM KAMI ================= */}
      {teamPhotos.length > 0 && (
        <section className="py-24 bg-gray-50 dark:bg-brand-navy-soft transition-colors">
          <div className="max-w-6xl mx-auto px-4 text-center">

            <h2 className="text-3xl font-bold mb-14 text-gray-900 dark:text-gray-100">
              Tim Kami
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

              {teamPhotos.map((member) => (
                <div
                  key={member.id}
                  className="bg-white dark:bg-brand-navy-light 
                             dark:border dark:border-white/10
                             rounded-2xl p-8 hover:shadow-lg 
                             hover:-translate-y-1
                             transition duration-300"
                >
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden relative
                                  bg-gray-200 dark:bg-brand-navy-soft">
                    <Image
                      src={member.file_url}
                      alt={member.alt_text || member.original_name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {member.alt_text && (
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {member.alt_text}
                    </h3>
                  )}

                  {member.caption && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      {member.caption}
                    </p>
                  )}
                </div>
              ))}

            </div>

          </div>
        </section>
      )}

      {/* ================= GALERI DOKUMENTASI ================= */}
      {galleryPhotos.length > 0 && (
        <section className="py-24 bg-white dark:bg-brand-navy transition-colors">
          <div className="max-w-6xl mx-auto px-4 text-center">

            <h2 className="text-3xl font-bold mb-14 text-gray-900 dark:text-gray-100">
              Galeri Dokumentasi
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {galleryPhotos.map((photo) => (
                <div
                  key={photo.id}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden
                             bg-gray-200 dark:bg-brand-navy-light 
                             dark:border dark:border-white/10
                             hover:scale-105 transition-transform duration-300"
                >
                  <Image
                    src={photo.file_url}
                    alt={photo.alt_text || photo.original_name}
                    fill
                    className="object-cover"
                  />
                  {photo.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-3">
                      <p className="text-sm">{photo.caption}</p>
                    </div>
                  )}
                </div>
              ))}

            </div>

          </div>
        </section>
      )}

    </div>
  );
}