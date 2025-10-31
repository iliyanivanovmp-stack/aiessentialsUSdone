'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const ROICalculator = () => {
  const [teamSize, setTeamSize] = useState(5);
  const [hourlyRate, setHourlyRate] = useState(50);
  const [repetitiveHours, setRepetitiveHours] = useState(10);
  const [estimatedSavings, setEstimatedSavings] = useState(0);
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    // Calculate ROI: (team size * hourly rate * repetitive hours * 12 weeks * automation efficiency)
    const weeklySavings = teamSize * hourlyRate * repetitiveHours;
    const automationEfficiency = 0.6; // 60% automation efficiency
    const savings = Math.round(weeklySavings * 12 * automationEfficiency);
    
    // Animate the number change
    let current = estimatedSavings;
    const increment = (savings - current) / 20;
    
    const timer = setInterval(() => {
      current += increment;
      if (Math.abs(current - savings) < Math.abs(increment)) {
        setEstimatedSavings(savings);
        clearInterval(timer);
        setShowCTA(true);
      } else {
        setEstimatedSavings(Math.round(current));
      }
    }, 50);

    return () => clearInterval(timer);
  }, [teamSize, hourlyRate, repetitiveHours]);

  const openEmailModal = () => {
    window.open('https://calendly.com/iliyan-ivanov-mp/discovery-call-with-aiessentials', '_blank');
  };

  return (
    <section className="py-24 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-headline font-bold text-3xl md:text-4xl mb-4">
            Estimate your 90-day ROI
          </h2>
          <p className="text-gray-400 text-lg">
            See how much you can save with AI systems
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-black border border-gray-800 rounded-2xl p-8 md:p-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Team Size Input */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-300">
                Team Size
              </label>
              <div className="relative">
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={teamSize}
                  onChange={(e) => setTeamSize(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1</span>
                  <span>50</span>
                </div>
              </div>
              <div className="text-center">
                <span className="text-2xl font-bold gradient-text">{teamSize}</span>
                <span className="text-gray-400 text-sm ml-1">people</span>
              </div>
            </div>
            
            {/* Hourly Rate Input */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-300">
                Avg Hourly Cost
              </label>
              <div className="relative">
                <input
                  type="range"
                  min="25"
                  max="200"
                  step="5"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>$25</span>
                  <span>$200</span>
                </div>
              </div>
              <div className="text-center">
                <span className="text-2xl font-bold gradient-text">${hourlyRate}</span>
                <span className="text-gray-400 text-sm ml-1">/hour</span>
              </div>
            </div>
            
            {/* Repetitive Hours Input */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-300">
                Repetitive Hours/Week
              </label>
              <div className="relative">
                <input
                  type="range"
                  min="1"
                  max="40"
                  value={repetitiveHours}
                  onChange={(e) => setRepetitiveHours(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1h</span>
                  <span>40h</span>
                </div>
              </div>
              <div className="text-center">
                <span className="text-2xl font-bold gradient-text">{repetitiveHours}</span>
                <span className="text-gray-400 text-sm ml-1">hours</span>
              </div>
            </div>
          </div>
          
          {/* Result Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center py-8 border-t border-gray-800"
          >
            <div className="text-sm text-gray-400 uppercase tracking-wider mb-2">
              Estimated 90-Day Savings
            </div>
            <motion.div
              key={estimatedSavings}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
              className="text-4xl md:text-5xl font-bold gradient-text mb-4"
            >
              ${estimatedSavings.toLocaleString()}
            </motion.div>
            <p className="text-gray-400 text-sm max-w-md mx-auto">
              Based on 60% automation efficiency across repetitive tasks
            </p>
          </motion.div>
          
          {/* Secondary CTA */}
          {showCTA && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center mt-8"
            >
              <motion.button
                onClick={openEmailModal}
                className="bg-white text-black px-8 py-4 text-sm uppercase tracking-wider font-semibold hover:bg-gray-200 transition-all duration-200 relative overflow-hidden group"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 0 30px rgba(0, 255, 255, 0.3)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-purple-500/10 to-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                />
                <span className="relative z-10">SEND ME A CUSTOM ROI REPORT</span>
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>
      
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00ffff 0%, #8b5cf6 50%, #ffd700 100%);
          cursor: pointer;
          box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00ffff 0%, #8b5cf6 50%, #ffd700 100%);
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
        }
        
        .slider:focus {
          outline: none;
        }
        
        .slider:focus::-webkit-slider-thumb {
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
        }
        
        .slider:focus::-moz-range-thumb {
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
        }
      `}</style>
    </section>
  );
};

export default ROICalculator;