export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 animate-pulse">
      {/* Title skeleton */}
      <div className="h-9 w-48 bg-gray-200 rounded mb-8" />

      {/* Content blocks */}
      <div className="space-y-4 mb-10">
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="h-4 bg-gray-200 rounded w-4/6" />
      </div>

      {/* Card grid skeleton */}
      <div className="grid md:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="border rounded-xl overflow-hidden">
            <div className="w-full h-48 bg-gray-200" />
            <div className="p-5 space-y-3">
              <div className="h-5 bg-gray-200 rounded" />
              <div className="h-4 w-32 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-4 w-3/4 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
