import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/60 bg-white/80 backdrop-blur mt-16">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">

        <div className="grid gap-10 md:grid-cols-3">

          {/* BRAND */}
          <div>
            <h3 className="text-lg font-semibold text-ink">
              {siteConfig.name}
            </h3>

            <p className="mt-3 text-sm text-slate-600 leading-6">
              Simple, clear, and working tech solutions for WiFi, mobile,
              laptop, and internet problems.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="text-sm font-semibold text-ink">Quick Links</h4>

            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/" className="hover:text-accent transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-accent transition">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* LEGAL */}
          <div>
            <h4 className="text-sm font-semibold text-ink">Legal</h4>

            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/privacy-policy" className="hover:text-accent transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-accent transition">
                  About
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="mt-10 border-t border-slate-200 pt-6 text-center text-sm text-slate-500">
          <p>
            © 2026 <span className="font-medium text-slate-700">{siteConfig.name}</span>. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}