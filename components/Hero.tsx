'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { InteractiveRobot } from './InteractiveRobot';

const Hero = () => {
  const [currentHeadline, setCurrentHeadline] = useState(0);
  
  const headlines = [
    {
      line1: "AIESSENTIALS SYSTEMS",
      line2: "FOR EFFICIENT GROWTH"
    },
    {
      line1: "MAKE MORE. SPEND LESS.",
      line2: "WITH TAILORED AI SYSTEMS."
    },
    {
      line1: "REMOVE BUSYWORK.",
      line2: "RELEASE PROFIT."
    }
  ];

  // Auto-rotate headlines every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadline((prev) => (prev + 1) % headlines.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [headlines.length]);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const openBookingModal = () => {
    window.open('https://calendly.com/iliyan-ivanov-mp/discovery-call-with-aiessentials', '_blank');
  };

  const openROIModal = () => {
    window.open('https://calendly.com/iliyan-ivanov-mp/discovery-call-with-aiessentials', '_blank');
  };

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center px-6 md:px-12 relative overflow-hidden">
      {/* Subtle background grid */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>
      
      <div className="text-center max-w-7xl mx-auto">
        <motion.div
          initial={{ scale: 0.96, opacity: 0.1 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <InteractiveRobot />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0.1, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-4"
        >
          <motion.h1 
            className="font-headline font-black text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-[0.8] tracking-tighter"
            key={currentHeadline}
            initial={{ opacity: 0.1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="gradient-text tracking-widest">{headlines[currentHeadline].line1}</div>
            <div className="text-gray-300">{headlines[currentHeadline].line2}</div>
          </motion.h1>
          
          <motion.p
            className="text-gray-400 text-base md:text-lg lg:text-xl max-w-[720px] mx-auto mt-8 leading-relaxed px-4 md:px-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            We audit your processes end-to-end, then design and deploy custom AI automations that either save money or make money—without adding headcount.
          </motion.p>
          
          <motion.div
            className="flex flex-col gap-4 justify-center items-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                onClick={openBookingModal}
                className="bg-white text-black px-8 py-4 text-sm tracking-wider font-semibold hover:bg-gray-200 transition-all duration-200 relative overflow-hidden group"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: '#f5f5f5',
                  boxShadow: '0 0 30px rgba(0, 255, 255, 0.3)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-purple-500/10 to-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                />
                <span className="relative z-10">Book Strategy Call</span>
              </motion.button>

              <motion.button
                onClick={openROIModal}
                className="border border-gray-600 text-white px-8 py-4 text-sm uppercase tracking-wider font-semibold hover:border-white hover:bg-white hover:text-black transition-all duration-200 relative group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-purple-500/5 to-yellow-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                />
                <span className="relative z-10">GET FREE AI ROI MAP</span>
              </motion.button>
            </div>

            <motion.p
              className="text-gray-400 text-sm mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              If it doesn't work, you don't pay
            </motion.p>
          </motion.div>
          
          {/* Trust micro-row */}
        </motion.div>
      </div>
      
      {/* Headline switcher (subtle) */}
      <motion.div 
        className="absolute top-1/2 right-8 transform -translate-y-1/2 hidden xl:flex flex-col space-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1, delay: 2 }}
      >
        {headlines.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentHeadline(index)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              currentHeadline === index 
                ? 'bg-gradient-to-r from-cyan-400 to-purple-500' 
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          />
        ))}
      </motion.div>
    </section>
  );
};

export default Hero;