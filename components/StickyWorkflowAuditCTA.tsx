'use client';

export default function StickyWorkflowAuditCTA() {
  return (
    <aside className="hidden xl:block">
      <div className="sticky top-24 w-[320px]">
        <div className="border border-gray-800 rounded-lg overflow-hidden bg-gradient-to-br from-purple-900/20 via-gray-900/50 to-cyan-900/20">
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
      </div>
    </aside>
  );
}
