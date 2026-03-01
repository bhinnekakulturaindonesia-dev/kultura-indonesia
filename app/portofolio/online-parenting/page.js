import Image from 'next/image'

export const metadata = {
  title: 'Online Parenting Narratives',
}

export default function OnlineParentingPage() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-brand-navy-soft">
      <div className="max-w-4xl mx-auto px-4">

        <div className="relative w-full h-[520px] rounded-lg overflow-hidden shadow-md mb-8">
          <Image
            src="/assets/portofolio/online-parenting-cover.jpg"
            alt="Online Parenting Narratives"
            fill
            className="object-cover"
          />
        </div>

        <p className="text-xs uppercase tracking-widest text-brand-blue mb-2">
          Studi Kultura Indonesia x MSI (Management Systems International) – Harmoni, USAID
        </p>

        <h1 className="text-2xl font-semibold mb-2">
          Online Parenting Narratives and Tolerance in Families in Indonesia
        </h1>

        <p className="italic text-gray-500 mb-4">
          (Narasi-Narasi Pengasuhan Daring untuk Mempromosikan Toleransi Keluarga di Indonesia)
        </p>

        <p className="text-sm text-gray-500 mb-8">
          Research Period: August 2020 – June 2021
        </p>

        <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>
            Ini adalah penelitian digital Kultura atas narasi-narasi pengasuhan di media sosial Pengasuhan keluarga telah menjadi pintu masuk bagi meluasnya praktek-praktek intoleransi dan ekslusivisme di Indonesia paling tidak dalam satu dekade terakhir. Fokus penelitian ini adalah melihat bagaimana narasi-narasi pengasuhan diproduksi, disebarluaskan, dan diterapkan melalui berbagai platform media sosial di Indonesia. Kultura menggunakan machine learning untuk mengumpulkan dan menganalisis berbagai jenis percakapan tentang tema pengasuhan tersebut.
          </p>

          <p>
            Penelitian ini berupaya mengidentifikasi narasi-narasi yang eksklusif, diskriminatif, dan mengandung kekerasan. Narasi-narasi semacam ini akan berdampak pada tertutupnya ruang-ruang dialog antar umat beragama dan golongan di Indonesia dan sekaligus berpotensi mematikan aspirasi kelompok-kelompok minoritas di Indonesia. Selain itu narasi-narasi ini memiliki implikasi serius terhadap pola hubungan dalam keluarga, antara lain pelanggengan praktek dominasi laki-laki atas perempuan dan menjadikan anak sebagai obyek indoktrinasi semata.
          </p>

          <p>
            Penelitian ini bertujuan membantu pemerintah dan organisasi masyarakat sipil (OMS) untuk mengindentifikasi dan mencegah narasi pengasuhan berbasis agama yang mendukung eksklusivisme dan anti keberagaman. Pemahaman mengenai narasi-narasi pengasuhan anak yang menyebar di media sosial menjadi krusial sebagai landasan bagi pembuatan kebijakan untuk mempromosikan toleransi dalam keluarga di Indonesia.
          </p>
          </div>

        <div className="mt-10 flex gap-4 flex-wrap">
          <a
            href="/files/portofolio/online-parenting-id.pdf"
            download
            className="bg-brand-blue text-white px-6 py-2.5 rounded-full hover:bg-brand-dark transition"
          >
            Download Bahasa Indonesia
          </a>

          <a
            href="/files/portofolio/online-parenting-en.pdf"
            download
            className="border border-brand-blue text-brand-blue px-6 py-2.5 rounded-full hover:bg-brand-blue hover:text-white transition"
          >
            Download English Version
          </a>
        </div>

      </div>
    </section>
  )

}
