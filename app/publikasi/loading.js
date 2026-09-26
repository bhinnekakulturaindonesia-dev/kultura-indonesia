export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="h-9 w-40 bg-gray-200 rounded animate-pulse mb-6" />

      {/* Tag skeleton */}
      <div className="flex gap-2 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-8 w-24 bg-gray-200 rounded-full animate-pulse" />
        ))}
      </div>

      {/* Card skeleton */}
      <div className="grid md:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="border rounded-xl overflow-hidden">
            <div className="w-full h-48 bg-gray-200 animate-pulse" />
            <div className="p-5 space-y-3">
              <div className="h-5 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
