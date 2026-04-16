import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

export async function GET() {
  const posts = getAllPosts();

  const urls = [
    `
    <url>
      <loc>${siteConfig.url}</loc>
      <changefreq>weekly</changefreq>
      <priority>1.0</priority>
    </url>
    `,
    `
    <url>
      <loc>${siteConfig.url}/blog</loc>
      <changefreq>weekly</changefreq>
      <priority>0.9</priority>
    </url>
    `,
    ...posts.map(
      (post) => `
      <url>
        <loc>${siteConfig.url}/blog/${post.slug}</loc>
        <lastmod>${post.date}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
    `
    )
  ].join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls}
  </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}