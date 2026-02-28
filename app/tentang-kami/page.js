export const metadata = {
  title: 'Tentang Kami',
}

export default function TentangKamiPage() {
  const tim = [
    { nama: 'Rheinhardt Sirait', jabatan: 'Peneliti' },
    { nama: 'Teguh Vicky Andrew', jabatan: 'Peneliti' },
    { nama: 'Indy Wantah', jabatan: 'Peneliti' },
    { nama: 'Hendi Ateng', jabatan: 'Peneliti' },
    { nama: 'Irma Rahmayuni', jabatan: 'Peneliti' },
    { nama: 'Sofiatul Hardiah', jabatan: 'Peneliti' },
  ]

  return (
    <div className="bg-white dark:bg-brand-navy transition-colors">

      {/* ================= INTRO ================= */}
      <section className="py-28">
        <div className="max-w-4xl mx-auto px-4 text-center">

          <p className="text-xs tracking-[6px] uppercase text-brand-blue dark:text-brand-gold mb-8">
            Siapa Kami
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mb-10 text-gray-900 dark:text-gray-100">
            Tentang Studi Kultura Indonesia
          </h1>

          <div className="bg-gray-50 dark:bg-brand-navy-light 
                          dark:border dark:border-white/10
                          rounded-2xl p-10 shadow-sm text-left">

            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              <strong>Halo, Kami Studi Kultura Indonesia.</strong> Sekelompok peneliti muda 
              yang berkomitmen untuk menghasilkan pengetahuan yang mempromosikan demokrasi 
              dan keragaman di Indonesia, dengan minat khusus dalam metodologi penelitian digital.
            </p>

          </div>
        </div>
      </section>

      {/* ================= FOKUS RISET ================= */}
      <section className="py-24 bg-gray-50 dark:bg-brand-navy-soft transition-colors">
        <div className="max-w-6xl mx-auto px-4 text-center">

          <h2 className="text-3xl font-bold mb-14 text-gray-900 dark:text-gray-100">
            Fokus Riset
          </h2>

          <div className="grid md:grid-cols-3 gap-12">

            {['Studi Budaya', 'Toleransi & Keragaman', 'Metodologi Digital'].map((item, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl bg-white dark:bg-brand-navy-light 
                           dark:border dark:border-white/10
                           hover:shadow-lg transition duration-300"
              >
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  {item}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  Analisis kritis dan berbasis data terhadap dinamika sosial digital dan budaya kontemporer.
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ================= TIM KAMI ================= */}
      <section className="py-24 bg-white dark:bg-brand-navy transition-colors">
        <div className="max-w-6xl mx-auto px-4 text-center">

          <h2 className="text-3xl font-bold mb-14 text-gray-900 dark:text-gray-100">
            Tim Kami
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

            {tim.map((item, i) => (
              <div
                key={i}
                className="bg-gray-50 dark:bg-brand-navy-light 
                           dark:border dark:border-white/10
                           rounded-2xl p-8 hover:shadow-lg 
                           hover:-translate-y-1
                           transition duration-300"
              >
                <div className="w-32 h-32 mx-auto mb-6 rounded-full 
                                bg-gray-200 dark:bg-brand-navy-soft">
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {item.nama}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {item.jabatan}
                </p>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* ================= GALERI ================= */}
      <section className="py-24 bg-gray-50 dark:bg-brand-navy-soft transition-colors">
        <div className="max-w-6xl mx-auto px-4 text-center">

          <h2 className="text-3xl font-bold mb-14 text-gray-900 dark:text-gray-100">
            Galeri Dokumentasi
          </h2>

          <div className="overflow-hidden relative">

            <div className="flex gap-8 animate-marquee">

              {[1, 2, 3].map((_, i) => (
                <div
                  key={i}
                  className="w-[400px] h-[260px] rounded-xl 
                             bg-gray-200 dark:bg-brand-navy-light 
                             dark:border dark:border-white/10
                             shrink-0"
                >
                </div>
              ))}

              {[1, 2, 3].map((_, i) => (
                <div
                  key={`dup-${i}`}
                  className="w-[400px] h-[260px] rounded-xl 
                             bg-gray-200 dark:bg-brand-navy-light 
                             dark:border dark:border-white/10
                             shrink-0"
                >
                </div>
              ))}

            </div>

          </div>

        </div>
      </section>

    </div>
  )
}