'use client'

import { motion } from "framer-motion";

export function InteractiveRobot() {
  return (
    <div className="relative w-[260px] h-[230px] md:w-[340px] md:h-[300px] lg:w-[400px] lg:h-[350px] xl:w-[480px] xl:h-[420px] 2xl:w-[560px] 2xl:h-[490px] mx-auto mb-6 flex items-center justify-center -translate-y-[10%]">
      <motion.div
        className="relative w-full h-full"
        animate={{
          y: [-6, 6, -6],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-2xl">
          <defs>
            <linearGradient id="bgRobotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00ffff" stopOpacity="0.8">
                <animate attributeName="stop-color" values="#00ffff;#8b5cf6;#ffd700;#00ffff" dur="8s" repeatCount="indefinite" />
              </stop>
              <stop offset="50%" stopColor="#cccccc" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#00ffff" stopOpacity="0.8">
                <animate attributeName="stop-color" values="#ffd700;#00ffff;#8b5cf6;#ffd700" dur="8s" repeatCount="indefinite" />
              </stop>
            </linearGradient>
            <linearGradient id="bgAccentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffd700" stopOpacity="0.7">
                <animate attributeName="stop-color" values="#ffd700;#8b5cf6;#00ffff;#ffd700" dur="8s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="#00ffff" stopOpacity="0.7">
                <animate attributeName="stop-color" values="#00ffff;#ffd700;#8b5cf6;#00ffff" dur="8s" repeatCount="indefinite" />
              </stop>
            </linearGradient>
            <radialGradient id="robotGlowGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00ffff" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#00ffff" stopOpacity="0" />
            </radialGradient>
            <filter id="bgRobotGlow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Ambient glow behind robot */}
          <circle cx="200" cy="220" r="140" fill="url(#robotGlowGradient)" opacity="0.6" />

          {/* Legs with bounce animation - lowest opacity */}
          <motion.g
            opacity="0.35"
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
                  fill="url(#bgAccentGradient)" stroke="#00ffff" strokeWidth="2"/>
            <rect x="210" y="300" width="25" height="45" rx="6"
                  fill="url(#bgAccentGradient)" stroke="#00ffff" strokeWidth="2"/>
          </motion.g>

          {/* Robot Body with breathing animation - medium-low opacity */}
          <motion.rect x="150" y="180" width="100" height="120" rx="10"
                opacity="0.45"
                fill="url(#bgRobotGradient)" stroke="#00ffff" strokeWidth="2" filter="url(#bgRobotGlow)"
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

          {/* Chest Panel - medium opacity */}
          <rect x="170" y="210" width="60" height="50" rx="4"
                opacity="0.5"
                fill="#000000" fillOpacity="0.3" stroke="#00ffff" strokeWidth="1"/>

          {/* Circuit Details with pulsing lights - medium opacity */}
          <motion.circle cx="190" cy="230" r="4" fill="#ffd700"
            opacity="0.4"
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
          />
          <motion.circle cx="210" cy="230" r="4" fill="#8b5cf6"
            opacity="0.4"
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
          />
          <motion.circle cx="200" cy="245" r="4" fill="#00ffff"
            opacity="0.4"
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0.8 }}
          />

          {/* Head with tilt animation - higher opacity */}
          <motion.g
            opacity="0.7"
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
                  fill="url(#bgRobotGradient)" stroke="#00ffff" strokeWidth="2" filter="url(#bgRobotGlow)"/>

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

          {/* Antenna - highest opacity */}
          <g opacity="0.8">
            <line x1="200" y1="120" x2="200" y2="100" stroke="#00ffff" strokeWidth="3"/>
            <motion.circle cx="200" cy="95" r="6" fill="#ffd700"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </g>

          {/* Floating data particles */}
          <motion.circle cx="180" cy="280" r="2" fill="#00ffff" opacity="0.25"
            animate={{
              y: [0, 60, 0],
              opacity: [0.25, 0.1, 0.25]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle cx="220" cy="290" r="1.5" fill="#00ffff" opacity="0.2"
            animate={{
              y: [0, 70, 0],
              opacity: [0.2, 0.05, 0.2]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          <motion.circle cx="200" cy="300" r="2.5" fill="#00ffff" opacity="0.3"
            animate={{
              y: [0, 65, 0],
              opacity: [0.3, 0.12, 0.3]
            }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <motion.circle cx="165" cy="295" r="1.5" fill="#00ffff" opacity="0.2"
            animate={{
              y: [0, 75, 0],
              opacity: [0.2, 0.08, 0.2]
            }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          />
        </svg>
      </motion.div>
    </div>
  )
}
