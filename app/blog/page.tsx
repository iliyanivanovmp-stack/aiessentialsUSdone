import { getAllPosts } from '@/lib/blog';
import Link from 'next/link';
import Image from 'next/image';
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
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-cyan-950/30 to-black py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold mb-6">
              AI Automation Insights
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              Expert strategies and insights to help you leverage AI for business growth
            </p>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No blog posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <article
                  key={post.slug}
                  className="group bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-400/10 transition-all duration-300"
                >
                  <Link href={`/blog/${post.slug}`} className="block">
                    {/* Image Container */}
                    <div className="relative h-48 w-full bg-gradient-to-br from-cyan-900/30 to-purple-900/30 overflow-hidden">
                      {post.coverImage ? (
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-6xl opacity-30">
                            {index % 4 === 0 && '🤖'}
                            {index % 4 === 1 && '⚡'}
                            {index % 4 === 2 && '💡'}
                            {index % 4 === 3 && '🚀'}
                          </div>
                        </div>
                      )}
                      {/* New badge for first post */}
                      {index === 0 && (
                        <span className="absolute top-4 left-4 px-3 py-1 bg-cyan-400/20 text-cyan-400 text-xs font-semibold rounded-full">
                          New
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Meta info */}
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <span>
                          {new Date(post.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                        <span>•</span>
                        <span>{post.readingTime}</span>
                      </div>

                      {/* Title */}
                      <h2 className="text-xl font-headline font-semibold mb-3 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Read more link */}
                      <span className="inline-flex items-center text-cyan-400 text-sm font-medium group-hover:gap-2 transition-all">
                        Read Article
                        <svg
                          className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-b from-black to-cyan-950/20 py-16">
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
      </main>
    </>
  );
}
