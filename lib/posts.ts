import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

type PostFrontMatter = {
  title: string;
  description: string;
  date: string;
  tags?: string[];
};

export type PostMeta = PostFrontMatter & {
  slug: string;
  tags: string[];
};

export type Post = PostMeta & {
  contentHtml: string;
};

function ensurePostsDirectory() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  return fs.readdirSync(postsDirectory);
}

export function getAllPosts(): PostMeta[] {
  return ensurePostsDirectory()
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);
      const frontMatter = data as PostFrontMatter;

      return {
        slug,
        title: frontMatter.title,
        description: frontMatter.description,
        date: frontMatter.date,
        tags: frontMatter.tags ?? []
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const frontMatter = data as PostFrontMatter;
  const processedContent = await remark().use(html).process(content);

  return {
    slug,
    title: frontMatter.title,
    description: frontMatter.description,
    date: frontMatter.date,
    tags: frontMatter.tags ?? [],
    contentHtml: processedContent.toString()
  };
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(new Date(date));
}
