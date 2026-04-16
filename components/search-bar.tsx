"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { PostMeta } from "@/lib/posts";

type SearchBarProps = {
  posts: PostMeta[];
};

export function SearchBar({ posts }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return [];
    }

    return posts
      .filter((post) => {
        const haystack = [
          post.title,
          post.description,
          post.tags.join(" ")
        ].join(" ");

        return haystack.toLowerCase().includes(normalizedQuery);
      })
      .slice(0, 5);
  }, [posts, query]);

  return (
    <div className="relative">
      <label htmlFor="post-search" className="sr-only">
        Search blog posts
      </label>
      <input
        id="post-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search articles, topics, or tags"
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none ring-0 transition placeholder:text-slate-400 focus:border-accent focus:shadow-sm"
      />

      {query.trim() ? (
        <div className="absolute left-0 right-0 top-[calc(100%+0.75rem)] z-20 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card">
          {results.length > 0 ? (
            <ul className="divide-y divide-slate-100">
              {results.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block px-4 py-3 transition hover:bg-slate-50"
                  >
                    <p className="text-sm font-semibold text-ink">{post.title}</p>
                    <p className="mt-1 line-clamp-2 text-sm text-slate-600">
                      {post.description}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-3 text-sm text-slate-500">
              No matching articles found.
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}
