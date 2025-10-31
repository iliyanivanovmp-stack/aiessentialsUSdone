'use client';

import { motion } from 'framer-motion';

const PASBlock = () => {
  const cards = [
    {
      type: 'THE PROBLEM',
      title: 'Manual processes drain profit.',
      description: 'Prospecting, reporting, triage, approvals—hours vanish, errors pile up, growth stalls.'
    },
    {
      type: 'THE COST',
      title: 'You\'re paying twice.',
      description: 'Once in salaries for repetitive work, and again in lost revenue from slow response times and missed opportunities.'
    },
    {
      type: 'THE SOLUTION',
      title: 'AIessentials builds systems that work while you sleep.',
      description: 'We map your workflows, pick the right models & tools, then deploy automations that cut cost or create revenue—fast.'
    }
  ];

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 px-6 md:px-12 bg-gray-950/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-black border border-gray-800 rounded-xl p-8 relative overflow-hidden group hover:border-gray-600 transition-all duration-300"
              whileHover={{ 
                rotateX: 2,
                rotateY: index === 1 ? -2 : 2,
                scale: 1.02
              }}
            >
              {/* Inner glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-purple-500/5 to-yellow-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Iridescent border glow on hover */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
              
              <div className="relative z-10">
                <div className="text-xs uppercase tracking-wider text-gray-500 mb-4">
                  {card.type}
                </div>
                
                <h3 className="font-headline font-bold text-xl mb-4 leading-tight">
                  {card.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button
            onClick={() => scrollToSection('process')}
            className="text-gray-400 hover:text-white text-sm uppercase tracking-wider transition-colors duration-200 relative group"
          >
            SEE HOW OUR PROCESS WORKS
            <motion.div
              className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-cyan-400 to-purple-500"
              initial={{ width: 0 }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.2 }}
            />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default PASBlock;