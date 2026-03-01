import Link from "next/link"
import Image from "next/image"
import { portofolio } from "../../lib/portofolio"

export const metadata = {
  title: "Portofolio",
}

export default function PortofolioPage() {
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
                src={item.image}
                alt={item.title}
                width={1200}
                height={900}
                className="object-contain max-h-full transition duration-500 group-hover:scale-105"
              />
            </div>

            {/* CONTENT */}
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-900 dark:text-white">
                {item.title}
              </h2>

              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                {item.description}
              </p>

              {/* BUTTON LOGIC */}
              {item.file && (
                <Link
                  href={item.file}
                  target="_blank"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
                >
                  Download
                </Link>
              )}

              {item.isDetailPage && (
                <Link
                  href={`/portofolio/${item.id}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
                >
                  Lihat Detail
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}