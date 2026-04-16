import Link from "next/link";
import { siteConfig } from "@/lib/site";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" }
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-slate-50/85 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="group inline-flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-accent text-base font-bold text-white shadow-sm transition group-hover:scale-[1.03]">
            F
          </span>
          <span className="text-lg font-semibold tracking-tight text-ink">
            {siteConfig.name}
          </span>
        </Link>

        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-2 sm:gap-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-white hover:text-accent-deep"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
