import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

export async function GET() {
  const posts = getAllPosts();

  const urls = [
    `<url><loc>${siteConfig.url}</loc></url>`,
    `<url><loc>${siteConfig.url}/blog</loc></url>`,
    ...posts.map(
      (post) => `<url><loc>${siteConfig.url}/blog/${post.slug}</loc></url>`
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