"use client";

import { useState, useMemo } from "react";
import type { Tool } from "@/types";
import ToolCard from "./ToolCard";

interface ToolsListProps {
  tools: Tool[];
  categories: string[];
}

type SortOption = "rating-desc" | "rating-asc" | "price-asc" | "price-desc" | "name-asc";

export default function ToolsList({ tools, categories }: ToolsListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [freeOnly, setFreeOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("rating-desc");

  const filteredAndSortedTools = useMemo(() => {
    let result = tools;

    if (selectedCategory !== "all") {
      result = result.filter((tool) => tool.categories.includes(selectedCategory));
    }

    if (freeOnly) {
      result = result.filter((tool) => tool.has_free_plan);
    }

    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case "rating-desc":
          return b.rating - a.rating;
        case "rating-asc":
          return a.rating - b.rating;
        case "price-asc": {
          const priceA = a.starting_price_jpy ?? 0;
          const priceB = b.starting_price_jpy ?? 0;
          return priceA - priceB;
        }
        case "price-desc": {
          const priceA = a.starting_price_jpy ?? 0;
          const priceB = b.starting_price_jpy ?? 0;
          return priceB - priceA;
        }
        case "name-asc":
          return a.name.localeCompare(b.name, "ja");
        default:
          return 0;
      }
    });

    return result;
  }, [tools, selectedCategory, freeOnly, sortBy]);

  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full">
          <div className="flex-1 min-w-0">
            <label htmlFor="category" className="block text-xs text-gray-600 mb-1">
              カテゴリ
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">すべて</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 min-w-0">
            <label htmlFor="sort" className="block text-xs text-gray-600 mb-1">
              並び順
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="rating-desc">評価が高い順</option>
              <option value="rating-asc">評価が低い順</option>
              <option value="price-asc">料金が安い順</option>
              <option value="price-desc">料金が高い順</option>
              <option value="name-asc">名前順</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="free-only"
            checked={freeOnly}
            onChange={(e) => setFreeOnly(e.target.checked)}
            className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
          />
          <label htmlFor="free-only" className="text-sm text-gray-700 cursor-pointer">
            無料プランのみ
          </label>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        {filteredAndSortedTools.length}件のツールが見つかりました
      </p>

      {filteredAndSortedTools.length === 0 ? (
        <p className="text-gray-500 text-center py-20">
          条件に一致するツールが見つかりませんでした。
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredAndSortedTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      )}
    </div>
  );
}
