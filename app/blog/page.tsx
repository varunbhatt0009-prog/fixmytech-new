import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { remark } from "remark";
import html from "remark-html";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function PostPage({ params }: any) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const processedContent = await remark()
    .use(html)
    .process(post.content);
  const contentHtml = processedContent.toString();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      
      {/* Back Button */}
      <Link
        href="/blog"
        className="text-sm text-blue-600 hover:underline"
      >
        ← Back to all articles
      </Link>

      {/* Title */}
      <h1 className="mt-4 text-3xl font-bold leading-tight text-gray-900">
        {post.title}
      </h1>

      {/* Description */}
      <p className="mt-3 text-gray-600">
        {post.description}
      </p>

      {/* Divider */}
      <div className="my-6 h-px bg-gray-200" />

      {/* Content */}
      <article
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />

      {/* Bottom CTA */}
      <div className="mt-10 rounded-xl bg-gray-100 p-5 text-center">
        <p className="text-sm text-gray-700">
          Still facing issues? Try other guides from our blog.
        </p>

        <Link
          href="/blog"
          className="mt-3 inline-block text-blue-600 font-semibold hover:underline"
        >
          Browse more fixes →
        </Link>
      </div>
    </div>
  );
}