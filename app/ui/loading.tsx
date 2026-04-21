export default function Loading() {
  return (
    <div className="p-8 animate-pulse">
      <div className="h-8 bg-gray-200 rounded-lg w-1/4 mb-2"></div>
      <div className="h-4 bg-gray-100 rounded w-1/6 mb-8"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
          >
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-100 rounded w-1/3"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
