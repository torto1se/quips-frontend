export function SidebarSkeleton() {
  return (
    <aside className="w-60 bg-bg-card border-r border-border flex flex-col gap-18 h-full shrink-0 animate-pulse">
      <div className="pt-8 pl-6 h-12 bg-gray-800/50 rounded-md mx-4" />
      <div className="flex flex-col flex-1 px-4 gap-4 mt-8">
        <div className="h-10 bg-gray-800/50 rounded-md" />
        <div className="h-10 bg-gray-800/50 rounded-md" />
        <div className="h-10 bg-gray-800/50 rounded-md" />
      </div>
      <div className="mt-auto mb-4 px-4">
        <div className="h-12 bg-gray-800/50 rounded-full" />
      </div>
    </aside>
  );
}
