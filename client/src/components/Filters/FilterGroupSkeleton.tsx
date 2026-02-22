export function FilterGroupSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-4 w-20 bg-gray-200 rounded mb-2" />
      <div className="flex flex-col gap-1.5">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-4 w-28 bg-gray-100 rounded" />
        ))}
      </div>
    </div>
  );
}
