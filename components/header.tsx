import Link from "next/link";
import { siteConfig } from "@/lib/site";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" }
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/60 bg-white/70 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

        {/* LOGO */}
        <Link href="/" className="group inline-flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-accent text-base font-bold text-white shadow-md transition duration-300 group-hover:scale-105 group-hover:shadow-lg">
            F
          </span>

          <span className="text-lg font-semibold tracking-tight text-ink transition group-hover:text-accent">
            {siteConfig.name}
          </span>
        </Link>

        {/* NAV */}
        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-2 sm:gap-4">

            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="relative rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition duration-200 hover:bg-white hover:text-accent-deep hover:shadow-sm"
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