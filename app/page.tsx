import type { Metadata } from "next";
import Link from "next/link";
import { PostCard } from "@/components/post-card";
import { SearchBar } from "@/components/search-bar";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Fix your WiFi, mobile, laptop, and internet problems easily with simple step-by-step guides."
};

export default function HomePage() {
  const posts = getAllPosts();
  const latestPosts = posts.slice(0, 6);
  const featuredPost = posts[0]; // 🔥 newest post as featured

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-4 pb-20 pt-10 sm:px-6 lg:px-8">

      {/* HERO */}
      <section className="grid gap-10 rounded-[2rem] border border-white/60 bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-12 shadow-md md:grid-cols-[1.25fr_0.75fr] md:px-10 md:py-16">
        
        <div className="max-w-2xl">
          <p className="mb-4 inline-flex rounded-full border border-accent/20 bg-white px-3 py-1 text-sm font-medium text-accent-deep shadow-sm">
            🚀 Fix your tech problems faster
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl leading-tight">
            WiFi, Mobile or Laptop Not Working?  
            <span className="block text-accent mt-2">
              Fix it in minutes.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
            Clear, simple, and working solutions for real problems.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-deep shadow-md"
            >
              Browse all fixes
            </Link>

            <a
              href="#latest-articles"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-accent hover:text-accent-deep"
            >
              Latest solutions
            </a>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-slate-200/80 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-ink">
            🔍 Find your issue instantly
          </h2>

          <p className="mt-2 text-sm text-slate-600">
            Search your problem and get quick fixes.
          </p>

          <div className="mt-5">
            <SearchBar posts={posts} />
          </div>
        </div>
      </section>

      {/* 🔥 FEATURED POST */}
      {featuredPost && (
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-ink">🔥 Featured Guide</h2>

          <Link
            href={`/blog/${featuredPost.slug}`}
            className="block rounded-2xl border bg-white p-6 shadow-md hover:shadow-lg transition"
          >
            <h3 className="text-2xl font-semibold text-ink">
              {featuredPost.title}
            </h3>
            <p className="mt-3 text-slate-600">
              {featuredPost.description}
            </p>
          </Link>
        </section>
      )}

      {/* 🏷️ CATEGORIES */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-ink">Browse by category</h2>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {["WiFi", "Mobile", "Laptop", "Apps"].map((cat) => (
            <div
              key={cat}
              className="rounded-xl border bg-white p-5 text-center font-semibold text-ink shadow-sm hover:shadow-md transition"
            >
              #{cat}
            </div>
          ))}
        </div>
      </section>

      {/* LATEST */}
      <section id="latest-articles" className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-ink">
              Latest fixes
            </h2>
            <p className="text-slate-600 mt-2">
              Fresh solutions for real problems.
            </p>
          </div>

          <Link
            href="/blog"
            className="hidden md:inline-flex text-sm font-semibold text-accent-deep hover:text-accent"
          >
            View all →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {latestPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

    </div>
  );
}