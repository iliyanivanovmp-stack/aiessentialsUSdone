import Link from 'next/link';

export default function AuthorBox() {
  return (
    <div className="mt-12 pt-8 border-t border-gray-800">
      <div className="flex items-start gap-4 p-6 bg-gray-900/50 rounded-lg border border-gray-800">
        {/* Author Avatar */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">AI</span>
          </div>
        </div>

        {/* Author Info */}
        <div className="flex-1 min-w-0">
          <h4 className="text-lg font-semibold text-white mb-1">
            AI Essentials Team
          </h4>
          <p className="text-sm text-gray-400 mb-3">
            We help B2B businesses implement AI automation in 14-30 days. Our team combines deep
            technical expertise with practical business experience to deliver automation systems
            that pay for themselves within 60 days.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/#contact"
              className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Get in Touch
            </Link>
            <span className="text-gray-600">•</span>
            <Link
              href="https://calendly.com/iliyan-ivanov-mp/discovery-call-with-aiessentials"
              className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a Free Strategy Call
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
