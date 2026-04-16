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

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 pb-20 pt-8 sm:px-6 lg:px-8">
      
      {/* HERO SECTION */}
      <section className="grid gap-8 rounded-[2rem] border border-white/60 bg-white/80 px-6 py-10 shadow-md backdrop-blur md:grid-cols-[1.25fr_0.75fr] md:px-10 md:py-14">
        
        <div className="max-w-2xl">
          <p className="mb-4 inline-flex rounded-full border border-accent/20 bg-accentSoft px-3 py-1 text-sm font-medium text-accent-deep">
            Fix your tech problems easily 🔧
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Simple solutions for WiFi, mobile, and laptop issues
          </h1>

          <p className="mt-5 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
            No complicated steps. Just clear, practical guides that actually work.
            Fix your problems faster without wasting time.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-deep"
            >
              Browse all fixes
            </Link>

            <a
              href="#latest-articles"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-accent hover:text-accent-deep"
            >
              Latest solutions
            </a>
          </div>
        </div>

        {/* SEARCH BOX */}
        <div className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50 p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-ink">
            Find your problem quickly
          </h2>

          <p className="mt-2 text-sm leading-7 text-slate-600">
            Search for WiFi, mobile, laptop, or internet issues.
          </p>

          <div className="mt-5">
            <SearchBar posts={posts} />
          </div>
        </div>
      </section>

      {/* LATEST ARTICLES */}
      <section id="latest-articles" className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-ink">
              Latest fixes
            </h2>

            <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">
              Recently added solutions for common tech problems.
            </p>
          </div>

          <Link
            href="/blog"
            className="hidden text-sm font-semibold text-accent-deep transition hover:text-accent md:inline-flex"
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