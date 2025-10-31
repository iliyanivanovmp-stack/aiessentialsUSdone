'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { CheckCircle, TrendingUp, Settings, Calendar } from 'lucide-react';

const CoreOffer = () => {
  const [dayCount, setDayCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      let current = 0;
      const target = 21;
      const increment = target / 30;
      
      const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
          setDayCount(target);
          clearInterval(counter);
        } else {
          setDayCount(Math.floor(current));
        }
      }, 50);
      
      return () => clearInterval(counter);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const openROIModal = () => {
    window.open('https://calendly.com/iliyan-ivanov-mp/discovery-call-with-aiessentials', '_blank');
  };

  const features = [
    {
      icon: TrendingUp,
      text: 'Clear Save/Make Money projection'
    },
    {
      icon: Settings,
      text: 'Tool & data integration plan'
    },
    {
      icon: Calendar,
      text: '90-day roadmap with milestones'
    }
  ];

  return (
    <section className="py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-headline font-bold text-4xl md:text-5xl mb-6">
              Your AI ROI Map — <span className="gradient-text">Free</span>
            </h2>
            
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              In a free 30-minute consult, we analyze your business processes and then identify the best AI systems that can be integrated in your workflow. We deliver a 1-page ROI plan designed specifically for you with full details: impact, tools, timeline, and cost. If the math doesn't work, we say so.
            </p>
            
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-3"
                >
                  <feature.icon className="w-5 h-5 text-cyan-400" />
                  <span className="text-gray-300">{feature.text}</span>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <p className="text-sm text-gray-500">
                Avg. first automation live in{' '}
                <span className="text-cyan-400 font-semibold">
                  14–30
                </span>{' '}
                days.
              </p>
            </motion.div>
            
            <motion.button
              onClick={openROIModal}
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
              <span className="relative z-10">GET MY ROI MAP</span>
            </motion.button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* ROI Map Mock */}
            <div className="bg-black border border-gray-800 rounded-2xl p-8 relative overflow-hidden">
              {/* Scanning line effect */}
              <motion.div
                className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                animate={{ 
                  y: [0, 300, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-headline font-bold text-xl">AI ROI Analysis</h3>
                  <div className="text-xs text-gray-500 bg-gray-900 px-3 py-1 rounded-full">
                    CONFIDENTIAL
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-950 rounded-lg p-4">
                    <div className="text-2xl font-bold gradient-text">$47K</div>
                    <div className="text-xs text-gray-500 uppercase">Annual Savings</div>
                  </div>
                  <div className="bg-gray-950 rounded-lg p-4">
                    <div className="text-2xl font-bold gradient-text">18 Days</div>
                    <div className="text-xs text-gray-500 uppercase">Implementation</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Lead Generation</span>
                    <span className="text-green-400">+340%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Response Time</span>
                    <span className="text-green-400">-78%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Manual Tasks</span>
                    <span className="text-green-400">-65%</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-800 pt-4">
                  <div className="text-xs text-gray-500 mb-2">90-Day Timeline</div>
                  <div className="flex space-x-1">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-2 flex-1 rounded-sm ${
                          i < 4 ? 'bg-cyan-400' : 
                          i < 8 ? 'bg-purple-500' : 
                          'bg-gray-700'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CoreOffer;