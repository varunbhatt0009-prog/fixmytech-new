import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/60 bg-white/70 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-slate-600 sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between">
        <p>
          {siteConfig.name} publishes clear, searchable tech fixes and practical
          guides.
        </p>
        <p>
          <span className="font-medium text-slate-700">{siteConfig.name}</span>{" "}
          © 2026
        </p>
      </div>
    </footer>
  );
}
