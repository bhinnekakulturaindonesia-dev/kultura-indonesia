import Link from "next/link"
import Image from "next/image"
import { getAllPortofolioFromDB } from "../../lib/portofolio-db"

export const metadata = {
  title: "Portofolio",
}

export const revalidate = 60; // Revalidate every 60 seconds

export default async function PortofolioPage() {
  const portofolio = await getAllPortofolioFromDB()

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-16 tracking-tight">
        Portofolio
      </h1>

      <div className="space-y-24">
        {portofolio.map((item) => (
          <div
            key={item.id}
            className="grid md:grid-cols-2 gap-12 items-center group"
          >
            {/* IMAGE */}
            <div className="relative w-full aspect-[4/3] bg-gray-50 dark:bg-[#081225] rounded-2xl overflow-hidden shadow-sm group-hover:shadow-lg transition duration-300 flex items-center justify-center">
              <Image
                src={item.gambar_url}
                alt={item.judul}
                width={1200}
                height={900}
                className="object-contain max-h-full transition duration-500 group-hover:scale-105"
              />
            </div>

            {/* CONTENT */}
            <div>
              {item.kategori && (
                <span className="inline-block px-3 py-1 mb-3 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium">
                  {item.kategori}
                </span>
              )}

              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900 dark:text-white">
                {item.judul}
              </h2>

              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                {item.deskripsi}
              </p>

              {/* BUTTONS */}
              <div className="flex gap-3">
                {item.file_url && (
                  <Link
                    href={item.file_url}
                    target="_blank"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
                  >
                    📄 Download PDF
                  </Link>
                )}

                {item.link && (
                  <Link
                    href={item.link}
                    target="_blank"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                  >
                    🔗 Lihat Link
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}