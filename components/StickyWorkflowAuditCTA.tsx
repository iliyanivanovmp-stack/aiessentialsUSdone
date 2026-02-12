'use client';

export default function StickyWorkflowAuditCTA() {
  return (
    <aside className="hidden xl:block">
      <div className="sticky top-24 w-[280px]">
        <div className="border-2 border-white bg-black shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
          {/* Header with brackets - matching reference image */}
          <div className="bg-cyan-400 px-4 py-3 flex items-center justify-center gap-2">
            <span className="text-black text-lg font-bold">[</span>
            <p className="text-black text-xs font-bold tracking-wider uppercase">
              Workflow Audit
            </p>
            <span className="text-black text-lg font-bold">]</span>
          </div>

          {/* Content */}
          <div className="p-6 bg-black">
            {/* Main Headline */}
            <h3 className="text-white text-lg font-bold mb-3 leading-tight italic">
              99% sure you don't know where exactly AI can help you
            </h3>

            {/* Supporting Text */}
            <p className="text-gray-300 text-sm mb-6 leading-relaxed">
              Are your workflows optimized with the most up to date tech or they are costing you and your team wasted hours and errors? See how you can optimize them.
            </p>

            {/* CTA Button */}
            <a
              href="https://aiessentials.us/free-ai-revenue-and-savings-plan"
              className="block w-full bg-cyan-400 text-black text-center font-bold text-sm px-6 py-3 border-2 border-white shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_0px_rgba(255,255,255,1)] transition-all duration-150"
            >
              GET FREE AUDIT
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
