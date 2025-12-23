import Link from 'next/link';
import Image from 'next/image';

export default function AuthorBox() {
  return (
    <div className="mt-12 pt-8 border-t border-gray-800">
      <div className="flex items-center gap-4 p-6 bg-gray-900/50 rounded-lg border border-gray-800">
        {/* Author Photo */}
        <div className="flex-shrink-0">
          <Image
            src="/images/iliyan-ivanov.webp"
            alt="Iliyan Ivanov"
            width={64}
            height={64}
            className="w-16 h-16 rounded-full object-cover"
          />
        </div>

        {/* Author Info */}
        <div className="flex-1 min-w-0">
          <h4 className="text-lg font-semibold text-white">
            Iliyan Ivanov
          </h4>
          <p className="text-sm text-gray-400">
            Founder of AIessentials
          </p>
        </div>
      </div>
    </div>
  );
}
