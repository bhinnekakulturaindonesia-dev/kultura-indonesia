import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'Digitalisasi Warisan Budaya Takbenda (WBTb)',
  description:
    'Program digitalisasi dan visualisasi Warisan Budaya Takbenda Indonesia oleh Studi Kultura Indonesia.',
}

export default function WBTBPage() {
  return (
    <section className="bg-gray-50 dark:bg-brand-navy-soft">

      {/* Hero */}
      <div className="relative w-full h-[420px]">
        <Image
          src="/assets/wbtb/hero-wbtb.jpg"
          alt="Digitalisasi WBTb"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center">
          <div className="max-w-5xl mx-auto px-6 text-white">
            <p className="uppercase tracking-widest text-sm mb-3">
              Studi Kultura Indonesia
            </p>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Digitalisasi Warisan Budaya Takbenda Indonesia
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-20">

        <div className="grid md:grid-cols-2 gap-12 items-start">

          <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed text-base">
            <p>
              Program ini merupakan inisiatif digitalisasi dan penguatan data
              Warisan Budaya Takbenda (WBTb) Indonesia melalui pemanfaatan
              teknologi Artificial Intelligence (AI), integrasi database,
              serta visualisasi berbasis Social Network Analysis (SNA).
            </p>

            <p>
              Studi Kultura Indonesia bekerja sama dengan Direktorat Jenderal
              Kebudayaan untuk menyusun ulang, memverifikasi, dan
              memvisualisasikan data WBTb agar lebih akurat, konsisten,
              serta mudah diakses publik.
            </p>

            <p>
              Platform ini dirancang sebagai fondasi data kebudayaan
              nasional yang dapat dimanfaatkan untuk riset, kebijakan,
              kurasi kebudayaan, dan penguatan ekosistem budaya Indonesia.
            </p>
          </div>

          {/* Statistik */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white dark:bg-brand-navy p-6 rounded-2xl shadow-md text-center">
              <p className="text-4xl font-bold text-brand-blue">1728</p>
              <p className="text-sm uppercase tracking-wider mt-2">
                Total WBTb
              </p>
            </div>

            <div className="bg-white dark:bg-brand-navy p-6 rounded-2xl shadow-md text-center">
              <p className="text-4xl font-bold text-brand-blue">200+</p>
              <p className="text-sm uppercase tracking-wider mt-2">
                Sudah Didigitalisasi
              </p>
            </div>

            <div className="bg-white dark:bg-brand-navy p-6 rounded-2xl shadow-md text-center">
              <p className="text-4xl font-bold text-brand-blue">5</p>
              <p className="text-sm uppercase tracking-wider mt-2">
                Domain Budaya
              </p>
            </div>

            <div className="bg-white dark:bg-brand-navy p-6 rounded-2xl shadow-md text-center">
              <p className="text-4xl font-bold text-brand-blue">AI + SNA</p>
              <p className="text-sm uppercase tracking-wider mt-2">
                Teknologi Analitik
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-16 border-t border-gray-200 dark:border-gray-700"></div>

        {/* CTA */}
        <div className="text-center space-y-6">
          <h2 className="text-2xl font-semibold">
            Jelajahi Visualisasi Data WBTb Indonesia
          </h2>

          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Akses platform interaktif untuk mengeksplorasi hubungan antar
            warisan budaya, fungsi sosial, ekosistem, dan daerah asal
            secara komprehensif.
          </p>

          <a
            href="https://wbtb.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-brand-blue text-white px-8 py-4 rounded-full hover:bg-brand-dark transition text-sm tracking-wide"
          >
            Buka Platform WBTb →
          </a>
        </div>

      </div>
    </section>
  )
}
