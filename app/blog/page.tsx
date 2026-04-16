import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/post-card";

export const metadata: Metadata = {
  title: "Blog",
  description: "All tech fixes and troubleshooting guides.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      
      <h1 className="text-3xl font-bold mb-6">
        All Articles
      </h1>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

    </div>
  );
}