import { getAllPosts } from '@/lib/blog';
import Link from 'next/link';
import { Metadata } from 'next';
import BlogHeader from '@/components/BlogHeader';

export const metadata: Metadata = {
  title: 'Blog | AI Essentials - AI Automation Insights',
  description: 'Expert insights on AI automation, business process optimization, and digital transformation. Learn how to leverage AI to grow your business.',
  openGraph: {
    title: 'Blog | AI Essentials',
    description: 'Expert insights on AI automation and business transformation',
    type: 'website',
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <BlogHeader />
      <main className="min-h-screen bg-black text-white pt-16">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">
          AI Automation Insights
        </h1>
        <p className="text-gray-400 text-lg mb-12">
          Expert strategies and insights to help you leverage AI for business growth
        </p>

        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No blog posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="border border-gray-800 rounded-lg p-6 hover:border-cyan-400/50 transition-colors"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 bg-cyan-400/10 text-cyan-400 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-2xl font-headline font-semibold mb-2 hover:text-cyan-400 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 mb-4">{post.excerpt}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>{post.author}</span>
                    <span className="mx-2">•</span>
                    <span>{new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readingTime}</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
        </div>
      </main>
    </>
  );
}
