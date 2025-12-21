'use client';

import { useEffect, useState, useCallback } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

function extractHeadings(html: string): Heading[] {
  const headings: Heading[] = [];
  // Match h2 and h3 tags with their id and text content
  const regex = /<h([23])[^>]*id="([^"]*)"[^>]*>(.*?)<\/h[23]>/gi;
  let match;

  while ((match = regex.exec(html)) !== null) {
    const level = parseInt(match[1]);
    const id = match[2];
    // Strip HTML tags from the heading text
    const text = match[3].replace(/<[^>]*>/g, '').trim();

    if (id && text) {
      headings.push({ id, text, level });
    }
  }

  return headings;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const extracted = extractHeadings(content);
    setHeadings(extracted);

    // Set initial active heading
    if (extracted.length > 0) {
      setActiveId(extracted[0].id);
    }
  }, [content]);

  const handleScroll = useCallback(() => {
    if (headings.length === 0) return;

    const scrollPosition = window.scrollY + 150; // Offset for better UX

    // Find the current section
    for (let i = headings.length - 1; i >= 0; i--) {
      const element = document.getElementById(headings[i].id);
      if (element && element.offsetTop <= scrollPosition) {
        setActiveId(headings[i].id);
        return;
      }
    }

    // Default to first heading if none found
    setActiveId(headings[0]?.id || '');
  }, [headings]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Call once on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  // Don't render if no headings
  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="hidden xl:block sticky top-24 h-fit max-h-[calc(100vh-8rem)] overflow-y-auto">
      <div className="pr-8">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">
          Table of Contents
        </h4>
        <ul className="space-y-1">
          {headings.map((heading) => (
            <li key={heading.id}>
              <button
                onClick={() => scrollToHeading(heading.id)}
                className={`
                  block w-full text-left text-sm py-1.5 transition-all duration-200 border-l-2
                  ${heading.level === 3 ? 'pl-6' : 'pl-4'}
                  ${activeId === heading.id
                    ? 'text-[#22c55e] border-[#22c55e] font-medium'
                    : 'text-gray-400 border-transparent hover:text-[#22c55e] hover:border-[#22c55e]/50'
                  }
                `}
              >
                {heading.text}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
