import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center px-4 text-center sm:px-6">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent-deep">
        404
      </p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-ink">
        The article you were looking for is not here.
      </h1>
      <p className="mt-4 max-w-xl text-base leading-8 text-slate-600">
        Try the blog archive to find another FixMyTech guide or head back to the
        homepage.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-deep"
        >
          Back to home
        </Link>
        <Link
          href="/blog"
          className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-accent hover:text-accent-deep"
        >
          Browse blog
        </Link>
      </div>
    </div>
  );
}
