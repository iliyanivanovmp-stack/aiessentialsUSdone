'use client';

import Link from 'next/link';
import Image from 'next/image';

const BlogHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-28">
          {/* Logo - Left */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/Gemini_Generated_Image_hcb1jjhcb1jjhcb1-removebg-preview.png"
              alt="AI Essentials"
              width={160}
              height={160}
              className="h-12 md:h-24 w-auto"
            />
          </Link>

          {/* Navigation - Center */}
          <nav className="flex items-center space-x-8">
            <Link
              href="/"
              className="text-white hover:text-cyan-400 text-sm font-medium uppercase tracking-wider transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href="/#faq"
              className="text-white hover:text-cyan-400 text-sm font-medium uppercase tracking-wider transition-colors duration-200"
            >
              FAQs
            </Link>
          </nav>

          {/* CTA Button - Right */}
          <Link
            href="https://calendly.com/iliyan-ivanov-mp/discovery-call-with-aiessentials"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-black px-4 py-2 text-sm font-semibold hover:bg-gray-100 transition-colors duration-200 rounded"
          >
            Book Free Call
          </Link>
        </div>
      </div>
    </header>
  );
};

export default BlogHeader;
