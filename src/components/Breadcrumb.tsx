import Link from "next/link";

interface BreadcrumbItem {
  name: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav
      aria-label="パンくずリスト"
      className="text-sm text-gray-600 py-2 overflow-x-auto"
    >
      <ol className="flex items-center gap-2 flex-nowrap whitespace-nowrap min-w-0">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2 min-w-0">
            {i > 0 && (
              <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-green-600 hover:underline transition-colors truncate"
              >
                {item.name}
              </Link>
            ) : (
              <span className="text-gray-900 font-medium truncate">{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
