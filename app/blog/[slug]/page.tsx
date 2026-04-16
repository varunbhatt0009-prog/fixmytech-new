import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { TagPill } from "@/components/tag-pill";
import { formatDate, getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site";
import { ProgressBar } from "@/components/progress-bar"; // ✅ added

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug
  }));
}

export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Article not found"
    };
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `${siteConfig.url}/blog/${post.slug}`
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description
    }
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug, post.tags);

  return (
    <>
      {/* 🔥 Progress Bar */}
      <ProgressBar />

      <div className="mx-auto w-full max-w-5xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">

        {/* Back Button */}
        <Link href="/blog" className="text-sm text-blue-600 hover:underline">
          ← Back to all articles
        </Link>

        <article className="mt-4 rounded-[2rem] border border-white/60 bg-white/90 px-6 py-10 shadow-card backdrop-blur md:px-12 md:py-14">

          {/* HEADER */}
          <header className="border-b border-slate-200 pb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent-deep">
              Tech Guide
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink sm:text-5xl leading-tight">
              {post.title}
            </h1>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
              {post.description}
            </p>

            <div className="mt-6 flex flex-col gap-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
              <time dateTime={post.date}>{formatDate(post.date)}</time>

              {post.tags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <TagPill key={tag} tag={tag} />
                  ))}
                </div>
              ) : null}
            </div>
          </header>

          {/* CONTENT */}
          <section
            className="prose prose-lg mx-auto mt-10 max-w-3xl"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

        </article>

        {/* 🔥 RELATED POSTS */}
        {relatedPosts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>

            <div className="grid gap-6 md:grid-cols-2">
              {relatedPosts.map((item) => (
                <Link
                  key={item.slug}
                  href={`/blog/${item.slug}`}
                  className="block rounded-xl border p-4 hover:shadow-md transition"
                >
                  <h3 className="font-semibold text-lg text-ink">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-500 mt-2">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </>
  );
}