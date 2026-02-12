import { getPostBySlug, getPostContent, getAllPostSlugs, getAllPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import TableOfContents from '@/components/TableOfContents';
import AuthorBox from '@/components/AuthorBox';
import RelatedPosts from '@/components/RelatedPosts';
import Footer from '@/components/Footer';
import BlogHeader from '@/components/BlogHeader';
import SummarizeWithAI from '@/components/SummarizeWithAI';
import StickyWorkflowAuditCTA from '@/components/StickyWorkflowAuditCTA';

const SITE_URL = 'https://aiessentials.us';

// Helper to extract FAQ items from HTML content
function extractFAQItems(html: string): { question: string; answer: string }[] {
  const faqItems: { question: string; answer: string }[] = [];

  // Find the FAQ section - matches both "faq" and "frequently-asked-questions" IDs
  const faqSectionMatch = html.match(/<h2[^>]*id="(?:faq|frequently-asked-questions)"[^>]*>.*?<\/h2>([\s\S]*?)(?=<h2|$)/i);
  if (!faqSectionMatch) return faqItems;

  const faqContent = faqSectionMatch[1];
  const questionRegex = /<h3[^>]*>(.*?)<\/h3>([\s\S]*?)(?=<h3|$)/gi;
  let match;

  while ((match = questionRegex.exec(faqContent)) !== null) {
    const question = match[1].replace(/<[^>]*>/g, '').trim();
    // Extract just the first paragraph as the answer
    const answerMatch = match[2].match(/<p[^>]*>([\s\S]*?)<\/p>/i);
    const answer = answerMatch
      ? answerMatch[1].replace(/<[^>]*>/g, '').trim()
      : match[2].replace(/<[^>]*>/g, '').trim().slice(0, 300);

    if (question && answer) {
      faqItems.push({ question, answer });
    }
  }

  return faqItems;
}

// Generate JSON-LD structured data
function generateStructuredData(post: {
  title: string;
  excerpt: string;
  date: string;
  updatedAt?: string;
  author: string;
  image?: string;
  tags: string[];
}, slug: string, faqItems: { question: string; answer: string }[]) {
  const canonicalUrl = `${SITE_URL}/blog/${slug}`;
  const imageUrl = post.image ? `${SITE_URL}${post.image}` : `${SITE_URL}/images/og-default.png`;

  const structuredData: object[] = [
    // Article Schema
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.excerpt,
      author: {
        '@type': 'Organization',
        name: 'AI Essentials',
        url: SITE_URL,
      },
      publisher: {
        '@type': 'Organization',
        name: 'AI Essentials',
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/images/logo.png`,
        },
      },
      datePublished: post.date,
      dateModified: post.updatedAt || post.date,
      image: imageUrl,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': canonicalUrl,
      },
      keywords: post.tags.join(', '),
    },
    // BreadcrumbList Schema
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: SITE_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: `${SITE_URL}/blog`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: post.title,
          item: canonicalUrl,
        },
      ],
    },
    // Organization Schema
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'AI Essentials',
      url: SITE_URL,
      description: 'AI automation consulting for B2B businesses. We build custom AI automation systems in 14-30 days that pay for themselves within 60 days.',
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        url: 'https://calendly.com/iliyan-ivanov-mp/discovery-call-with-aiessentials',
      },
    },
  ];

  // Add FAQPage schema if there are FAQ items
  if (faqItems.length > 0) {
    structuredData.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    });
  }

  return structuredData;
}

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

  const canonicalUrl = `${SITE_URL}/blog/${params.slug}`;
  const imageUrl = post.image ? `${SITE_URL}${post.image}` : `${SITE_URL}/images/og-default.png`;

  return {
    title: `${post.title} | AI Essentials Blog`,
    description: post.excerpt,
    authors: [{ name: post.author }],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.updatedAt || post.date,
      authors: [post.author],
      tags: post.tags,
      url: canonicalUrl,
      images: [{ url: imageUrl }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [imageUrl],
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
  // Remove the first H2 (which often duplicates the title) and replace with SummarizeWithAI component
  const content = rawContent.replace(/<h2[^>]*>[\s\S]*?<\/h2>/, '');
  const blogUrl = `${SITE_URL}/blog/${params.slug}`;

  // Get related posts (matching tags, excluding current post)
  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== params.slug)
    .filter((p) => p.tags.some((tag) => post.tags.includes(tag)))
    .slice(0, 3);

  // If not enough related posts by tag, fill with recent posts
  if (relatedPosts.length < 3) {
    const recentPosts = allPosts
      .filter((p) => p.slug !== params.slug && !relatedPosts.some((rp) => rp.slug === p.slug))
      .slice(0, 3 - relatedPosts.length);
    relatedPosts.push(...recentPosts);
  }

  // Generate structured data
  const faqItems = extractFAQItems(rawContent);
  const structuredData = generateStructuredData(post, params.slug, faqItems);

  return (
    <>
    <BlogHeader showBackToBlog={true} />
    <main className="min-h-screen bg-black text-white">
      {/* JSON-LD Structured Data */}
      {structuredData.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
      <div className="max-w-7xl mx-auto px-4 py-24 relative">
        <div className="xl:grid xl:grid-cols-[280px_1fr_320px] xl:gap-8">
          {/* Table of Contents - Desktop Sticky Sidebar */}
          <aside className="hidden xl:block">
            <TableOfContents content={rawContent} />
          </aside>

          {/* Main Article Content */}
          <article className="max-w-3xl mx-auto xl:mx-0">
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

              <div className="flex flex-wrap items-center text-gray-400 gap-y-1">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                <span className="mx-3">•</span>
                <span className="font-medium">Iliyan Ivanov</span>
                <span className="mx-3">•</span>
                <span className="text-cyan-400">[</span>
                <a
                  href="https://x.com/IliyanIvanov_AI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors mx-1"
                  aria-label="Follow on X"
                >
                  <svg className="w-4 h-4 inline" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <span className="text-gray-500">,</span>
                <a
                  href="https://www.linkedin.com/in/iliyan-ivanov-50299b215/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors mx-1"
                  aria-label="Connect on LinkedIn"
                >
                  <svg className="w-4 h-4 inline" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <span className="text-cyan-400">]</span>
              </div>
            </header>

            {/* Summarize with AI buttons */}
            <SummarizeWithAI blogUrl={blogUrl} />

            {/* Mobile Workflow Audit CTA - Shows after opening section on mobile/tablet */}
            <div className="xl:hidden my-8 border border-gray-800 rounded-lg overflow-hidden bg-gradient-to-br from-purple-900/20 via-gray-900/50 to-cyan-900/20">
              {/* Header */}
              <div className="bg-gradient-to-r from-cyan-600 to-purple-600 px-4 py-3">
                <p className="text-white text-sm font-bold tracking-wider uppercase text-center">
                  Workflow Audit
                </p>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Main Headline */}
                <h3 className="text-white text-xl font-bold mb-4 leading-tight">
                  99% sure you don't know where exactly AI can help you
                </h3>

                {/* Supporting Text */}
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  Are your workflows optimized with the most up to date tech or they are costing you and your team wasted hours and errors? See how you can optimize them.
                </p>

                {/* CTA Button */}
                <a
                  href="https://aiessentials.us/free-ai-revenue-and-savings-plan"
                  className="block w-full bg-cyan-400 text-black text-center font-semibold px-6 py-3 rounded-lg hover:bg-cyan-300 transition-all duration-200 shadow-lg hover:shadow-cyan-400/20"
                >
                  Get Free Audit
                </a>
              </div>
            </div>

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

            {/* Author Credibility Box */}
            <AuthorBox />

            {/* Footer CTA */}
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

          {/* Sticky Workflow Audit CTA - Desktop Only */}
          <StickyWorkflowAuditCTA />
        </div>

        {/* CTA Section */}
        <div className="mt-16 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">
              Ready to automate your business?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Book a free discovery call and learn how AI can save you 20+ hours per week.
            </p>
            <Link
              href="https://calendly.com/iliyan-ivanov-mp/discovery-call-with-aiessentials"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-cyan-400 text-black px-8 py-3 font-semibold rounded-lg hover:bg-cyan-300 transition-colors"
            >
              Book Free Call
            </Link>
          </div>
        </div>

        {/* Continue Reading - Related Posts (last element before footer) */}
        {relatedPosts.length > 0 && (
          <RelatedPosts posts={relatedPosts} />
        )}
      </div>
    </main>
    <Footer />
    </>
  );
}
