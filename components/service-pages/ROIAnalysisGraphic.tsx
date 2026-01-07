'use client';

import { motion } from 'framer-motion';

const ROIAnalysisGraphic = () => {
  return (
    <div className="bg-black border border-gray-800 rounded-lg p-3 lg:p-4 xl:p-5 2xl:p-6 relative overflow-hidden max-w-xl xl:max-w-2xl 2xl:max-w-3xl mx-auto">
      <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-b from-cyan-400 to-transparent opacity-5 pointer-events-none rounded-t-lg" />
      <motion.div
        className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
        animate={{
          y: [0, 150, 0],
          opacity: [0, 1, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="space-y-2.5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 xl:gap-3 2xl:gap-4">
          <div className="bg-gray-950 rounded-md p-2 xl:p-3 2xl:p-4 border border-gray-800">
            <div className="text-base lg:text-lg xl:text-xl 2xl:text-2xl font-bold gradient-text mb-0.5">$47K</div>
            <div className="text-[9px] xl:text-[10px] 2xl:text-xs text-gray-500 uppercase tracking-wide">Annual Savings</div>
          </div>
          <div className="bg-gray-950 rounded-md p-2 xl:p-3 2xl:p-4 border border-gray-800">
            <div className="text-base lg:text-lg xl:text-xl 2xl:text-2xl font-bold gradient-text mb-0.5">18 Days</div>
            <div className="text-[9px] xl:text-[10px] 2xl:text-xs text-gray-500 uppercase tracking-wide">Implementation</div>
          </div>
          <div className="bg-gray-950 rounded-md p-2 xl:p-3 2xl:p-4 border border-gray-800">
            <div className="text-base lg:text-lg xl:text-xl 2xl:text-2xl font-bold gradient-text mb-0.5">+340%</div>
            <div className="text-[9px] xl:text-[10px] 2xl:text-xs text-gray-500 uppercase tracking-wide">Lead Generation</div>
          </div>
          <div className="bg-gray-950 rounded-md p-2 xl:p-3 2xl:p-4 border border-gray-800">
            <div className="text-base lg:text-lg xl:text-xl 2xl:text-2xl font-bold gradient-text mb-0.5">-78%</div>
            <div className="text-[9px] xl:text-[10px] 2xl:text-xs text-gray-500 uppercase tracking-wide">Response Time</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-2 xl:gap-3 2xl:gap-4">
          <div className="bg-gray-950/50 rounded-md p-2.5 xl:p-3 2xl:p-4 border border-gray-800">
            <div className="text-[10px] xl:text-xs 2xl:text-sm text-gray-400 mb-2 uppercase tracking-wide">Performance Metrics</div>
            <div className="space-y-1.5 xl:space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-[10px] xl:text-xs 2xl:text-sm">Manual Task Reduction</span>
                <span className="text-green-400 font-bold text-xs xl:text-sm 2xl:text-base">-65%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-[10px] xl:text-xs 2xl:text-sm">Cost Efficiency Gain</span>
                <span className="text-green-400 font-bold text-xs xl:text-sm 2xl:text-base">+89%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-[10px] xl:text-xs 2xl:text-sm">Customer Satisfaction</span>
                <span className="text-green-400 font-bold text-xs xl:text-sm 2xl:text-base">+42%</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-950/50 rounded-md p-2.5 xl:p-3 2xl:p-4 border border-gray-800">
            <div className="text-[10px] xl:text-xs 2xl:text-sm text-gray-400 mb-2 uppercase tracking-wide">90-Day Rollout</div>
            <div className="space-y-1.5 xl:space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <div className="text-[9px] xl:text-[10px] 2xl:text-xs text-gray-500 mb-0.5">Phase 1: Discovery</div>
                  <div className="h-1 xl:h-1.5 2xl:h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-400 rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>
                <span className="text-[9px] xl:text-[10px] 2xl:text-xs text-cyan-400 font-bold">30d</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <div className="text-[9px] xl:text-[10px] 2xl:text-xs text-gray-500 mb-0.5">Phase 2: Implementation</div>
                  <div className="h-1 xl:h-1.5 2xl:h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>
                <span className="text-[9px] xl:text-[10px] 2xl:text-xs text-purple-400 font-bold">30d</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <div className="text-[9px] xl:text-[10px] 2xl:text-xs text-gray-500 mb-0.5">Phase 3: Optimization</div>
                  <div className="h-1 xl:h-1.5 2xl:h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gray-600 rounded-full" style={{ width: '60%' }} />
                  </div>
                </div>
                <span className="text-[9px] xl:text-[10px] 2xl:text-xs text-gray-400 font-bold">30d</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROIAnalysisGraphic;
