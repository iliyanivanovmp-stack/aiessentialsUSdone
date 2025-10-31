'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const Torus = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative w-80 h-80 md:w-96 md:h-96 mx-auto mb-12">
      <motion.div
        className="absolute inset-0"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ 
          scale: 1.05,
          transition: { duration: 0.3 }
        }}
      >
        <motion.svg
          viewBox="0 0 400 400"
          className="w-full h-full"
          animate={{ 
            rotateY: isHovered ? 0 : [0, 360],
          }}
          transition={{ 
            duration: isHovered ? 0.5 : 20, 
            repeat: isHovered ? 0 : Infinity, 
            ease: "linear",
            repeatType: "loop"
          }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <defs>
            <linearGradient id="torusGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00ffff" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#ffd700" stopOpacity="0.7" />
            </linearGradient>
            <linearGradient id="torusReflection" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="innerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00ffff" stopOpacity="0.6" />
              <stop offset="33%" stopColor="#8b5cf6" stopOpacity="0.7" />
              <stop offset="66%" stopColor="#ffd700" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#00ffff" stopOpacity="0.5" />
            </linearGradient>
            <radialGradient id="centerGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#00ffff" stopOpacity="0.2" />
            </radialGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <filter id="bloom" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="bloom"/>
              <feColorMatrix in="bloom" type="matrix" values="1 0 0 0 0  0 0 1 0 0  0 0 0 1 0  0 0 0 0.3 0"/>
            </filter>
          </defs>
          
          {/* Bloom effect background */}
          <circle 
            cx="200" 
            cy="200" 
            r="140" 
            fill="none" 
            stroke="url(#torusGradient)" 
            strokeWidth="32" 
            filter="url(#bloom)"
            opacity="0.6"
          />
          
          {/* Outer ring */}
          <circle 
            cx="200" 
            cy="200" 
            r="140" 
            fill="none" 
            stroke="url(#torusGradient)" 
            strokeWidth="32" 
            filter="url(#glow)"
          />
          
          {/* Middle ring */}
          <circle 
            cx="200" 
            cy="200" 
            r="100" 
            fill="none" 
            stroke="url(#innerGradient)" 
            strokeWidth="20"
            filter="url(#glow)"
            opacity="0.8"
          />
          
          {/* Inner ring */}
          <circle 
            cx="200" 
            cy="200" 
            r="60" 
            fill="none" 
            stroke="url(#torusGradient)" 
            strokeWidth="12"
            opacity="0.9"
          />
          
          {/* Center core */}
          <circle 
            cx="200" 
            cy="200" 
            r="25" 
            fill="url(#centerGradient)" 
            stroke="url(#torusReflection)" 
            strokeWidth="2"
          />
          
          {/* Highlight shimmer */}
          <motion.circle 
            cx="200" 
            cy="200" 
            r="140" 
            fill="none" 
            stroke="#ffffff" 
            strokeWidth="2"
            strokeOpacity={isHovered ? "0.8" : "0.4"}
            animate={{ 
              strokeOpacity: isHovered ? [0.4, 0.8, 0.4] : [0.2, 0.6, 0.2],
              strokeWidth: isHovered ? [2, 4, 2] : [1, 3, 1]
            }}
            transition={{ 
              duration: isHovered ? 1.5 : 3, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Secondary shimmer on middle ring */}
          <motion.circle 
            cx="200" 
            cy="200" 
            r="100" 
            fill="none" 
            stroke="#ffffff" 
            strokeWidth="1"
            strokeOpacity="0.5"
            animate={{ 
              strokeOpacity: [0.2, 0.6, 0.2],
              r: [98, 102, 98]
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
          
          {/* Glass reflection effect */}
          <motion.circle 
            cx="170" 
            cy="170" 
            r="30" 
            fill="none" 
            stroke="#ffffff" 
            strokeWidth="1"
            strokeOpacity="0.6"
            animate={{ 
              strokeOpacity: [0.3, 0.7, 0.3],
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          
          {/* Additional orbital elements */}
          <motion.circle 
            cx="200" 
            cy="200" 
            r="180" 
            fill="none" 
            stroke="url(#torusGradient)" 
            strokeWidth="4"
            strokeOpacity="0.3"
            strokeDasharray="20 40"
            animate={{ 
              rotate: [0, 360],
              strokeOpacity: [0.2, 0.4, 0.2]
            }}
            transition={{ 
              rotate: { duration: 25, repeat: Infinity, ease: "linear" },
              strokeOpacity: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
          />
        </motion.svg>
      </motion.div>
    </div>
  );
};

export default Torus;