import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { TagPill } from "@/components/tag-pill";
import { formatDate, getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site";
import { ProgressBar } from "@/components/progress-bar";

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
      <ProgressBar />

      <div className="mx-auto w-full max-w-6xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">

        {/* Back */}
        <Link href="/blog" className="text-sm text-blue-600 hover:underline">
          ← Back to all articles
        </Link>

        {/* ARTICLE */}
        <article className="mt-4 rounded-[2rem] border border-white/60 bg-white/95 px-6 py-10 shadow-lg md:px-14 md:py-14">

          {/* HEADER */}
          <header className="border-b border-slate-200 pb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent-deep">
              Tech Guide
            </p>

            <h1 className="mt-3 text-4xl font-bold leading-tight text-ink sm:text-5xl">
              {post.title}
            </h1>

            <p className="mt-4 text-lg text-slate-600 max-w-3xl">
              {post.description}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-500">
              <time dateTime={post.date}>{formatDate(post.date)}</time>

              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <TagPill key={tag} tag={tag} />
                  ))}
                </div>
              )}
            </div>
          </header>

          {/* CONTENT */}
          <section
            className="prose prose-lg max-w-3xl mx-auto mt-10 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          {/* CTA */}
          <div className="mt-12 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 p-6 text-center">
            <p className="text-lg font-medium text-ink">
              Still stuck? Check more solutions 👇
            </p>

            <Link
              href="/blog"
              className="mt-4 inline-block rounded-full bg-accent px-6 py-3 text-white font-semibold hover:bg-accent-deep transition"
            >
              Browse all guides →
            </Link>
          </div>

        </article>

        {/* RELATED */}
        {relatedPosts.length > 0 && (
          <div className="mt-14">
            <h2 className="text-2xl font-bold mb-6 text-ink">
              Related Articles
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              {relatedPosts.map((item) => (
                <Link
                  key={item.slug}
                  href={`/blog/${item.slug}`}
                  className="block rounded-xl border bg-white p-5 hover:shadow-md transition"
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