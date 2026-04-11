import type { Tool } from "@/types";
import ToolCard from "./ToolCard";

interface ToolGridProps {
  tools: Tool[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export default function ToolGrid({ tools, columns = 3, className = "" }: ToolGridProps) {
  const gridClass = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  }[columns];

  if (tools.length === 0) {
    return (
      <div className={`text-center py-12 text-gray-500 ${className}`}>
        <p className="text-lg">ツールが見つかりませんでした。</p>
      </div>
    );
  }

  return (
    <div className={`grid ${gridClass} gap-6 ${className}`}>
      {tools.map((tool) => (
        <ToolCard key={tool.slug} tool={tool} />
      ))}
    </div>
  );
}
