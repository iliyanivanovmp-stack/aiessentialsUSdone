'use client';

import { motion } from 'framer-motion';
import { Search, AtSign, Rocket, TrendingUp } from 'lucide-react';

const Process = () => {
  const steps = [
    {
      number: '1',
      title: 'Discover',
      description: 'Discuss your vision, goals and processes. Identify AI opportunities.',
      icon: Search,
      color: '#22D3EE',
      side: 'left'
    },
    {
      number: '2',
      title: 'Design',
      description: 'Tailoring, KPIs, Tools, integration plan, risk/reward projection.',
      icon: AtSign,
      color: '#8B5CF6',
      side: 'right'
    },
    {
      number: '3',
      title: 'Deploy',
      description: 'Build, test, train, go live. Instrument analytics.',
      icon: Rocket,
      color: '#22C55E',
      side: 'left'
    },
    {
      number: '4',
      title: 'Scale',
      description: 'Monitor, iterate, add automations monthly. Quarterly ROI review.',
      icon: TrendingUp,
      color: '#F59E0B',
      side: 'right'
    }
  ];

  const openBookingModal = () => {
    window.open('https://calendly.com/iliyan-ivanov-mp/discovery-call-with-aiessentials', '_blank');
  };

  return (
    <section id="process" className="py-16 md:py-28 px-6 md:px-12 relative" style={{ backgroundColor: '#1A1A1A' }}>
      <div className="max-w-7xl mx-auto relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          className="text-center mb-12 md:mb-14"
        >
          <h2 className="font-headline font-semibold text-2xl md:text-5xl tracking-tight text-white">
            How We{' '}
            <span className="bg-gradient-to-r from-[#22D3EE] via-[#8B5CF6] to-[#F59E0B] bg-clip-text text-transparent">
              De-Risk
            </span>{' '}
            AI Projects
          </h2>
        </motion.div>

        {/* Central Timeline Spine - Desktop Only */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-20 bottom-32">
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            transition={{ duration: 0.5, delay: 0 }}
            viewport={{ once: true, margin: "0px 0px -200px 0px" }}
            className="w-0.5 bg-gradient-to-b from-[#22D3EE] via-[#8B5CF6] to-[#F59E0B] relative"
          >
          </motion.div>
        </div>

        {/* Cards Container */}
        <div className="relative">
          {steps.map((step, index) => (
            <div key={index}>
              {/* Image positioned beside Discover box (index 0) */}
              {index === 0 && (
                <div className="mb-8 md:mb-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  {/* Mobile Image - Above Discover Box */}
                  <div className="w-full md:hidden flex justify-center mb-4">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0 }}
                      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                    >
                      <img
                        src="/ChatGPT Image Sep 7, 2025, 01_11_26 PM.png"
                        alt="AI Process Visualization"
                        className="w-48 h-48 object-contain"
                      />
                    </motion.div>
                  </div>

                  <div className="w-full">
                    {/* Discover card container */}
                    <motion.div
                      initial={{
                        opacity: 0,
                        x: -24
                      }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0 }}
                      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                      className="w-full"
                    >
                      <motion.div
                        whileHover={{ 
                          y: -3,
                          rotateY: 2,
                          transition: { duration: 0.2 }
                        }}
                        className="
                          bg-[#0E0E10] border border-[#232326] rounded-xl p-5 md:p-6
                          shadow-[0_10px_30px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.04)]
                          hover:shadow-[0_15px_40px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.08)]
                          transition-all duration-300 group relative overflow-hidden
                        "
                        style={{
                          background: 'linear-gradient(135deg, #0E0E10 0%, #0F0F12 100%)'
                        }}
                      >
                        {/* Mobile Timeline Border */}
                        <div className="md:hidden absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#22D3EE] via-[#8B5CF6] to-[#F59E0B]" />
                        
                        {/* Hover Border Animation */}
                        <motion.div
                          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{
                            background: `linear-gradient(90deg, ${step.color}20, transparent, ${step.color}20)`,
                            backgroundSize: '200% 100%'
                          }}
                          animate={{
                            backgroundPosition: ['0% 0%', '200% 0%']
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'linear'
                          }}
                        />

                        {/* Connector Line - Desktop Only */}
                        <motion.div
                          className="
                            hidden md:block absolute top-1/2 transform -translate-y-1/2 w-3 h-px bg-[#232326]
                            opacity-35 group-hover:opacity-80 transition-opacity duration-200
                            right-0 translate-x-full
                          "
                        />

                        <div className="relative z-10">
                          {/* Title Row */}
                          <div className="flex items-center mb-3">
                            {/* Mobile Step Dot */}
                            <div className="md:hidden w-2 h-2 rounded-full mr-4 -ml-1" style={{ backgroundColor: step.color }} />
                            
                            {/* Icon Circle */}
                            <motion.div
                              className="w-10 h-10 rounded-full flex items-center justify-center mr-4 group-hover:shadow-lg transition-shadow duration-200"
                              style={{
                                backgroundColor: `${step.color}15`,
                                border: `1px solid ${step.color}30`
                              }}
                              whileHover={{
                                boxShadow: `0 0 16px ${step.color}40`
                              }}
                            >
                              <step.icon 
                                className="w-5 h-5" 
                                style={{ color: step.color }}
                                aria-hidden="true"
                              />
                            </motion.div>
                            
                            {/* Title */}
                            <h3 className="font-headline font-semibold text-lg md:text-xl text-white">
                              {step.number}. {step.title}
                            </h3>
                          </div>
                          
                          {/* Description */}
                          <p className="text-[#C4C4C4] leading-relaxed ml-0 md:ml-14">
                            {step.description}
                          </p>
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                  
                  {/* Image positioned on the right side */}
                  <div className="w-full flex justify-center md:justify-start">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                      className="hidden md:block"
                    >
                      <img
                        src="/ChatGPT Image Sep 7, 2025, 01_11_26 PM.png"
                        alt="AI Process Visualization"
                        className="w-72 h-72 object-contain ml-[210px] -mt-10"
                      />
                    </motion.div>
                  </div>
                </div>
              )}
              
              {/* Regular cards for other steps */}
              {index !== 0 && (
                <>
              {/* Mobile Image - Above Design Box */}
              {index === 1 && (
                <div className="w-full md:hidden flex justify-center mb-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0 }}
                    viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                  >
                    <img
                      src="/Design-Spiral_all-blacks-1A1A1A.png"
                      alt="Design Process Visualization"
                      className="w-48 h-48 object-contain opacity-90"
                    />
                  </motion.div>
                </div>
              )}

              {/* Design Spiral Image - positioned on left side between Design and Deploy */}
              {index === 1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.15 }}
                  viewport={{ once: true, margin: "0px 0px -150px 0px" }}
                  className="hidden md:block absolute left-0 w-[273px] h-[273px] ml-[190px]"
                  style={{ top: 'calc(50% - 230px)', transform: 'translateY(-50%)' }}
                >
                  <img
                    src="/Design-Spiral_all-blacks-1A1A1A.png"
                    alt="Design Process Visualization"
                    className="w-full h-full object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
                  />
                </motion.div>
              )}
              
              {/* Mobile Image - Above Deploy Box */}
              {index === 2 && (
                <div className="w-full md:hidden flex justify-center mb-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0 }}
                    viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                  >
                    <img
                      src="/NeonTarget_BG_0D0D0D.png"
                      alt="Target Achievement Visualization"
                      className="w-48 h-48 object-contain"
                      style={{ filter: 'brightness(2)' }}
                    />
                  </motion.div>
                </div>
              )}

              {/* Design Spiral Image - positioned between Design and Deploy */}
              {/* Neon Target Image - positioned on right side between Deploy and Scale */}
              {index === 2 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  viewport={{ once: true, margin: "0px 0px -150px 0px" }}
                  className="hidden md:block absolute right-0 w-[239px] h-[239px] mr-[170px]"
                  style={{ top: 'calc(50% + 36px)', transform: 'translateY(-50%)' }}
                >
                  <img 
                    src="/NeonTarget_BG_0D0D0D.png"
                    alt="Target Achievement Visualization"
                    className="w-full h-full object-contain opacity-100 hover:opacity-100 transition-opacity duration-300"
                    style={{ filter: 'brightness(2)' }}
                  />
                </motion.div>
              )}
              
              {/* Mobile Image - Above Scale Box */}
              {index === 3 && (
                <div className="w-full md:hidden flex justify-center mb-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0 }}
                    viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                  >
                    <img
                      src="/WireframeRocket_BG_1A1A1A (1).png"
                      alt="Rocket Launch Visualization"
                      className="w-80 h-80 object-contain"
                    />
                  </motion.div>
                </div>
              )}

              {/* Wireframe Rocket Image - positioned on left side at Scale level */}
              {index === 3 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.25 }}
                  viewport={{ once: true, margin: "0px 0px -150px 0px" }}
                  className="hidden md:block absolute left-0 w-[403px] h-[403px] ml-[125px]"
                  style={{ top: 'calc(50% + 190px)', transform: 'translateY(-50%)' }}
                >
                  <img
                    src="/WireframeRocket_BG_1A1A1A (1).png"
                    alt="Rocket Launch Visualization"
                    className="w-full h-full object-contain opacity-100 hover:opacity-100 transition-opacity duration-300"
                  />
                </motion.div>
              )}
              
                <motion.div
                  initial={{
                    opacity: 0,
                    x: step.side === 'left' ? -24 : 24
                  }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                  className={`${index === 3 ? 'mb-8 md:mb-16 mt-8 md:mt-[150px]' : index === 2 ? 'mb-8 md:mb-16 mt-8 md:mt-[80px]' : index === 1 ? 'mb-8 md:mb-16 -mt-5' : 'mb-8 md:mb-16'} flex relative ${
                    step.side === 'left'
                      ? 'md:justify-start'
                      : 'md:justify-end'
                  }`}
                >
                  <motion.div
                    whileHover={{ 
                      y: -3,
                      rotateY: step.side === 'left' ? 2 : -2,
                      transition: { duration: 0.2 }
                    }}
                    className={`
                      w-full md:w-[580px] bg-[#0E0E10] border border-[#232326] rounded-xl p-5 md:p-6
                      shadow-[0_10px_30px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.04)]
                      hover:shadow-[0_15px_40px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.08)]
                      transition-all duration-300 group relative overflow-hidden
                      ${step.side === 'left' ? 'md:mr-16' : 'md:ml-16'}
                      md:hidden-border-gradient
                    `}
                    style={{
                      background: 'linear-gradient(135deg, #0E0E10 0%, #0F0F12 100%)'
                    }}
                  >
                    {/* Mobile Timeline Border */}
                    <div className="md:hidden absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#22D3EE] via-[#8B5CF6] to-[#F59E0B]" />
                    
                    {/* Hover Border Animation */}
                    <motion.div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(90deg, ${step.color}20, transparent, ${step.color}20)`,
                        backgroundSize: '200% 100%'
                      }}
                      animate={{
                        backgroundPosition: ['0% 0%', '200% 0%']
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'linear'
                      }}
                    />

                    {/* Connector Line - Desktop Only */}
                    <motion.div
                      className={`
                        hidden md:block absolute top-1/2 transform -translate-y-1/2 w-3 h-px bg-[#232326]
                        opacity-35 group-hover:opacity-80 transition-opacity duration-200
                        ${step.side === 'left' ? 'right-0 translate-x-full' : 'left-0 -translate-x-full'}
                      `}
                    />

                    <div className="relative z-10">
                      {/* Title Row */}
                      <div className="flex items-center mb-3">
                        {/* Mobile Step Dot */}
                        <div className="md:hidden w-2 h-2 rounded-full mr-4 -ml-1" style={{ backgroundColor: step.color }} />
                        
                        {/* Icon Circle */}
                        <motion.div
                          className="w-10 h-10 rounded-full flex items-center justify-center mr-4 group-hover:shadow-lg transition-shadow duration-200"
                          style={{
                            backgroundColor: `${step.color}15`,
                            border: `1px solid ${step.color}30`
                          }}
                          whileHover={{
                            boxShadow: `0 0 16px ${step.color}40`
                          }}
                        >
                          <step.icon 
                            className="w-5 h-5" 
                            style={{ color: step.color }}
                            aria-hidden="true"
                          />
                        </motion.div>
                        
                        {/* Title */}
                        <h3 className="font-headline font-semibold text-lg md:text-xl text-white">
                          {step.number}. {step.title}
                        </h3>
                      </div>
                      
                      {/* Description */}
                      <p className="text-[#C4C4C4] leading-relaxed ml-0 md:ml-14">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          className="text-center mt-32"
        >
          <motion.button
            onClick={openBookingModal}
            className="bg-white text-black px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-wider hover:bg-black hover:text-white transition-all duration-300 relative overflow-hidden group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0A0A0A]"
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 0 20px rgba(34, 211, 238, 0.3)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(90deg, #22D3EE20, #8B5CF620, #F59E0B20)'
              }}
            />
            Book a Call
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Process;