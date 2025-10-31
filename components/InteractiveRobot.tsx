'use client'

import { motion } from "framer-motion";

export function InteractiveRobot() {
  return (
    <div className="relative w-[365px] h-[320px] md:w-[475px] md:h-[420px] lg:w-[570px] lg:h-[500px] mx-auto mb-12 flex items-center justify-center">
      <motion.div
        className="relative w-full h-full"
        animate={{
          y: [-10, 10, -10],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-2xl">
          <defs>
            <linearGradient id="robotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00ffff" stopOpacity="0.6">
                <animate attributeName="stop-color" values="#00ffff;#8b5cf6;#ffd700;#00ffff" dur="8s" repeatCount="indefinite" />
              </stop>
              <stop offset="50%" stopColor="#cccccc" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#00ffff" stopOpacity="0.6">
                <animate attributeName="stop-color" values="#ffd700;#00ffff;#8b5cf6;#ffd700" dur="8s" repeatCount="indefinite" />
              </stop>
            </linearGradient>
            <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffd700" stopOpacity="0.5">
                <animate attributeName="stop-color" values="#ffd700;#8b5cf6;#00ffff;#ffd700" dur="8s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="#00ffff" stopOpacity="0.5">
                <animate attributeName="stop-color" values="#00ffff;#ffd700;#8b5cf6;#00ffff" dur="8s" repeatCount="indefinite" />
              </stop>
            </linearGradient>
            <filter id="robotGlow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Robot Body with breathing animation */}
          <motion.rect x="150" y="180" width="100" height="120" rx="10"
                fill="url(#robotGradient)" stroke="#00ffff" strokeWidth="2" filter="url(#robotGlow)"
                animate={{
                  scaleY: [1, 1.03, 1],
                  scaleX: [1, 0.98, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ transformOrigin: "200px 240px" }}
          />

          {/* Head with tilt animation */}
          <motion.g
            animate={{
              rotate: [-2, 2, -2],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ transformOrigin: "200px 155px" }}
          >
            <rect x="160" y="120" width="80" height="70" rx="8"
                  fill="url(#robotGradient)" stroke="#00ffff" strokeWidth="2" filter="url(#robotGlow)"/>

            {/* Eyes with blinking animation */}
            <motion.ellipse cx="180" cy="150" rx="8" ry="8" fill="#00ffff"
              animate={{
                ry: [8, 1, 8, 8, 8],
                opacity: [1, 1, 1, 0.3, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                times: [0, 0.1, 0.2, 0.5, 1]
              }}
            />
            <motion.ellipse cx="220" cy="150" rx="8" ry="8" fill="#00ffff"
              animate={{
                ry: [8, 1, 8, 8, 8],
                opacity: [1, 1, 1, 0.3, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                times: [0, 0.1, 0.2, 0.5, 1]
              }}
            />

            {/* Smile with animation */}
            <motion.path
              d="M 180 165 Q 200 170 220 165"
              stroke="#00ffff"
              strokeWidth="2"
              fill="none"
              animate={{
                d: [
                  "M 180 165 Q 200 170 220 165",
                  "M 180 165 Q 200 172 220 165",
                  "M 180 165 Q 200 170 220 165"
                ]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.g>

          {/* Antenna */}
          <line x1="200" y1="120" x2="200" y2="100" stroke="#00ffff" strokeWidth="3"/>
          <motion.circle cx="200" cy="95" r="6" fill="#ffd700"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />

          {/* Left Arm with sway animation */}
          <motion.rect x="110" y="200" width="35" height="60" rx="8"
                fill="url(#accentGradient)" stroke="#00ffff" strokeWidth="2"
                animate={{
                  rotate: [-5, 5, -5],
                  x: [110, 108, 110]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ transformOrigin: "127px 200px" }}
          />

          {/* Right Arm with sway animation */}
          <motion.rect x="255" y="200" width="35" height="60" rx="8"
                fill="url(#accentGradient)" stroke="#00ffff" strokeWidth="2"
                animate={{
                  rotate: [5, -5, 5],
                  x: [255, 257, 255]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ transformOrigin: "272px 200px" }}
          />

          {/* Legs with bounce animation */}
          <motion.g
            animate={{
              y: [0, -3, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          >
            <rect x="165" y="300" width="25" height="45" rx="6"
                  fill="url(#accentGradient)" stroke="#00ffff" strokeWidth="2"/>
            <rect x="210" y="300" width="25" height="45" rx="6"
                  fill="url(#accentGradient)" stroke="#00ffff" strokeWidth="2"/>
          </motion.g>

          {/* Chest Panel */}
          <rect x="170" y="210" width="60" height="50" rx="4"
                fill="#000000" fillOpacity="0.3" stroke="#00ffff" strokeWidth="1"/>

          {/* Circuit Details with pulsing lights */}
          <motion.circle cx="190" cy="230" r="4" fill="#ffd700"
            animate={{
              opacity: [0.4, 1, 0.4],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
          />
          <motion.circle cx="210" cy="230" r="4" fill="#8b5cf6"
            animate={{
              opacity: [0.4, 1, 0.4],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
          />
          <motion.circle cx="200" cy="245" r="4" fill="#00ffff"
            animate={{
              opacity: [0.4, 1, 0.4],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0.8 }}
          />
        </svg>
      </motion.div>
    </div>
  )
}