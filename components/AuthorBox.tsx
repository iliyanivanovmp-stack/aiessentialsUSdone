'use client';

import { useState } from 'react';

export default function AuthorBox() {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="mt-12 pt-8 border-t border-gray-800">
      <div className="flex items-center gap-4 p-6 bg-gray-900/50 rounded-lg border border-gray-800">
        {/* Author Photo */}
        <div className="flex-shrink-0">
          {!imageError ? (
            <img
              src="/images/iliyan-ivanov.png"
              alt="Iliyan Ivanov"
              width={64}
              height={64}
              className="w-16 h-16 rounded-full object-cover"
              style={{ imageRendering: 'crisp-edges', objectPosition: 'center 55%' }}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-cyan-400/20 flex items-center justify-center">
              <span className="text-cyan-400 text-xl font-bold">II</span>
            </div>
          )}
        </div>

        {/* Author Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <div>
              <h4 className="text-lg font-semibold text-white">
                Iliyan Ivanov
              </h4>
              <p className="text-sm text-gray-400">
                Founder of AIessentials
              </p>
            </div>
            {/* Social Links */}
            <div className="flex items-center gap-2 ml-auto">
              <a
                href="https://x.com/IliyanIvanov_AI"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
                aria-label="Follow on X"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/iliyan-ivanov-50299b215/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
                aria-label="Connect on LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
