import Link from "next/link";
import { type PostMeta, formatDate } from "@/lib/posts";
import { TagPill } from "@/components/tag-pill";

type PostCardProps = {
  post: PostMeta;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group rounded-[1.5rem] border border-white/60 bg-white/85 p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-accent/20">
      <div className="flex items-center justify-between gap-4 text-sm text-slate-500">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          Article
        </span>
      </div>

      <h3 className="mt-4 text-2xl font-semibold tracking-tight text-ink">
        <Link href={`/blog/${post.slug}`} className="transition hover:text-accent-deep">
          {post.title}
        </Link>
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
        {post.description}
      </p>

      {post.tags.length > 0 ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <TagPill key={tag} tag={tag} />
          ))}
        </div>
      ) : null}

      <div className="mt-6">
        <Link
          href={`/blog/${post.slug}`}
          className="text-sm font-semibold text-accent-deep transition hover:text-accent"
        >
          Read article
        </Link>
      </div>
    </article>
  );
}
