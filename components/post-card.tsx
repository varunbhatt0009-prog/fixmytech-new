import Link from "next/link";
import { type PostMeta, formatDate } from "@/lib/posts";
import { TagPill } from "@/components/tag-pill";

type PostCardProps = {
  post: PostMeta;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group rounded-[1.5rem] border border-white/60 bg-white/90 p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-accent/30">

      {/* Top */}
      <div className="flex items-center justify-between gap-4 text-sm text-slate-500">
        <time dateTime={post.date}>{formatDate(post.date)}</time>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          Article
        </span>
      </div>

      {/* Title */}
      <h3 className="mt-4 text-2xl font-semibold tracking-tight text-ink leading-snug">
        <Link
          href={`/blog/${post.slug}`}
          className="transition duration-200 group-hover:text-accent"
        >
          {post.title}
        </Link>
      </h3>

      {/* Description */}
      <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
        {post.description}
      </p>

      {/* Tags */}
      {post.tags.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <TagPill key={tag} tag={tag} />
          ))}
        </div>
      )}

      {/* CTA */}
      <div className="mt-6">
        <Link
          href={`/blog/${post.slug}`}
          className="inline-block rounded-full bg-accent/10 px-4 py-2 text-sm font-semibold text-accent-deep transition hover:bg-accent hover:text-white"
        >
          Read article →
        </Link>
      </div>
    </article>
  );
}