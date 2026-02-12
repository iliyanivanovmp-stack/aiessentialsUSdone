'use client';

export default function StickyWorkflowAuditCTA() {
  return (
    <aside className="hidden xl:block">
      <div className="sticky top-24 w-[280px]">
        <div className="border border-gray-800/50 rounded-xl overflow-hidden bg-gradient-to-br from-gray-900/40 via-gray-900/60 to-gray-900/40 backdrop-blur-sm shadow-xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-500/80 to-purple-500/80 px-4 py-2.5">
            <p className="text-white text-xs font-semibold tracking-widest uppercase text-center">
              Workflow Audit
            </p>
          </div>

          {/* Content */}
          <div className="p-5">
            {/* Main Headline */}
            <h3 className="text-white text-lg font-semibold mb-3 leading-snug">
              99% sure you don't know where exactly AI can help you
            </h3>

            {/* Supporting Text */}
            <p className="text-gray-400 text-xs mb-5 leading-relaxed">
              Are your workflows optimized with the most up to date tech or they are costing you and your team wasted hours and errors? See how you can optimize them.
            </p>

            {/* CTA Button */}
            <a
              href="https://aiessentials.us/free-ai-revenue-and-savings-plan"
              className="block w-full bg-gradient-to-r from-cyan-400 to-cyan-500 text-black text-center font-semibold text-sm px-5 py-2.5 rounded-lg hover:from-cyan-300 hover:to-cyan-400 transition-all duration-300 shadow-lg hover:shadow-cyan-400/30 hover:scale-[1.02]"
            >
              Get Free Audit
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
