import { getPostBySlug, getPostContent, getAllPostSlugs } from '@/lib/blog';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import TableOfContents from '@/components/TableOfContents';

// Helper to extract H2 headings from HTML content
function extractH2Headings(html: string): { id: string; text: string }[] {
  const headings: { id: string; text: string }[] = [];
  const regex = /<h2[^>]*id="([^"]*)"[^>]*>(.*?)<\/h2>/gi;
  let match;

  while ((match = regex.exec(html)) !== null) {
    const id = match[1];
    const text = match[2].replace(/<[^>]*>/g, '').trim();
    if (id && text) {
      headings.push({ id, text });
    }
  }

  return headings;
}

// Inject mobile TOC before the first H2
function injectMobileTOC(html: string): string {
  const headings = extractH2Headings(html);

  if (headings.length === 0) {
    return html;
  }

  const mobileTOCHtml = `
<nav class="xl:hidden my-8 p-4 bg-gray-900/50 border border-gray-800 rounded-lg">
  <h4 class="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
    Table of Contents
  </h4>
  <ul class="space-y-2">
    ${headings.map(h => `
    <li>
      <a href="#${h.id}" class="text-sm text-gray-400 hover:text-purple-400 transition-colors block py-0.5">
        ${h.text}
      </a>
    </li>
    `).join('')}
  </ul>
</nav>
`;

  // Find the first H2 and insert mobile TOC before it
  const firstH2Match = html.match(/<h2[^>]*>/i);
  if (firstH2Match && firstH2Match.index !== undefined) {
    return html.slice(0, firstH2Match.index) + mobileTOCHtml + html.slice(firstH2Match.index);
  }

  return html;
}

export const dynamicParams = false;

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found | AI Essentials',
    };
  }

  return {
    title: `${post.title} | AI Essentials Blog`,
    description: post.excerpt,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
    keywords: post.tags,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const rawContent = await getPostContent(params.slug);
  const content = injectMobileTOC(rawContent);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-24 relative">
        <div className="xl:grid xl:grid-cols-[280px_1fr] xl:gap-8">
          {/* Table of Contents - Desktop Sticky Sidebar */}
          <aside className="hidden xl:block">
            <TableOfContents content={rawContent} />
          </aside>

          {/* Main Article Content */}
          <article className="max-w-3xl mx-auto xl:mx-0">
            <Link
              href="/blog"
              className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-8 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>

            {/* Inline TOC for mobile */}
            <TableOfContents content={content} variant="inline" />

            <header className="mb-12">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 bg-cyan-400/10 text-cyan-400 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-4xl md:text-5xl font-headline font-bold mb-6">
                {post.title}
              </h1>

              <div className="flex items-center text-gray-400">
                <span className="font-medium">{post.author}</span>
                <span className="mx-3">•</span>
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                <span className="mx-3">•</span>
                <span>{post.readingTime}</span>
              </div>
            </header>

            <div
              className="prose prose-invert prose-lg max-w-none
                prose-headings:font-headline prose-headings:text-white
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-gray-300 prose-p:leading-relaxed
                prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-white
                prose-ul:text-gray-300 prose-ol:text-gray-300
                prose-li:marker:text-cyan-400
                prose-blockquote:border-cyan-400 prose-blockquote:text-gray-400
                prose-code:text-cyan-400 prose-code:bg-gray-900 prose-code:px-1 prose-code:rounded
                prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800"
              dangerouslySetInnerHTML={{ __html: content }}
            />

            <footer className="mt-16 pt-8 border-t border-gray-800">
              <div className="flex justify-between items-center">
                <Link
                  href="/blog"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  ← More Articles
                </Link>
                <Link
                  href="/#contact"
                  className="bg-white text-black px-6 py-3 font-medium hover:bg-gray-100 transition-colors"
                >
                  Get in Touch
                </Link>
              </div>
            </footer>
          </article>
        </div>
      </div>
    </main>
  );
}
