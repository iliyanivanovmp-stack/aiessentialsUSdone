'use client';

import { useEffect, useState, useCallback } from 'react';

interface Heading {
  id: string;
  text: string;
}

interface TableOfContentsProps {
  content: string;
}

function extractH2s(html: string): Heading[] {
  const headings: Heading[] = [];
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

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const extracted = extractH2s(content);
    setHeadings(extracted);

    if (extracted.length > 0) {
      setActiveId(extracted[0].id);
    }
  }, [content]);

  const handleScroll = useCallback(() => {
    if (headings.length === 0) return;

    const scrollPosition = window.scrollY + 150;

    for (let i = headings.length - 1; i >= 0; i--) {
      const element = document.getElementById(headings[i].id);
      if (element && element.offsetTop <= scrollPosition) {
        setActiveId(headings[i].id);
        return;
      }
    }

    setActiveId(headings[0]?.id || '');
  }, [headings]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

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

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="hidden xl:block sticky top-24 h-fit max-h-[calc(100vh-8rem)] overflow-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <div className="pr-6">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">
          Table of Contents
        </h4>
        <ul className="space-y-1">
          {headings.map((heading) => (
            <li key={heading.id}>
              <button
                onClick={() => scrollToHeading(heading.id)}
                className={`
                  block w-full text-left text-sm py-1.5 transition-all duration-200 border-l-2 pl-3
                  ${activeId === heading.id
                    ? 'text-purple-400 border-purple-400 font-medium'
                    : 'text-gray-400 border-transparent hover:text-purple-400 hover:border-purple-400/50'
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
