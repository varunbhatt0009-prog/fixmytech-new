import type { Metadata } from "next";
import { PostCard } from "@/components/post-card";
import { SearchBar } from "@/components/search-bar";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Browse the full FixMyTech archive of troubleshooting guides, repair walkthroughs, and tech optimization articles."
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 pb-20 pt-8 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-white/60 bg-white/80 px-6 py-10 shadow-card backdrop-blur md:px-10">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent-deep">
          FixMyTech archive
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink">
          Actionable blog posts for common tech issues
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
          Explore all articles by keyword, device problem, or tag. Every post
          is stored as markdown for easy publishing and static performance.
        </p>
        <div className="mt-6 max-w-2xl">
          <SearchBar posts={posts} />
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-ink">
          All articles
        </h2>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
