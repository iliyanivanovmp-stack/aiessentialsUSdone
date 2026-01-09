'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { TrendingUp, Settings, Brain, ChevronRight } from 'lucide-react';

const Services = () => {
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const services = [
    {
      icon: TrendingUp,
      title: '24/7 Pipeline Engine - LeadGen Systems',
      description: '24/7 system that identifies ICP targets, enriches, writes personalized outreach, and appoints new meetings.',
      bullets: ['List Building', 'Enrichment', '24/7 Leadflow', 'Sequencing', 'CRM Integration'],
      microProof: 'Typical: +25–45% reply lift.',
      details: [
        'AI-powered prospect identification with ICP scoring',
        'Multi-source data enrichment and verification',
        'Dynamic personalization using company triggers and events',
        'Automated multi-channel sequence orchestration',
        'Intelligent lead scoring and CRM handover workflows',
        'Performance tracking and continuous optimization'
      ]
    },
    {
      icon: Brain,
      title: 'Free AI Revenue + Savings Plan',
      description: 'In 30 minutes, you’ll know the top 3 AI opportunities that will save you  or make you money — plus a 1-page ROI plan.',
      bullets: ['Free', 'AI opportunity scan', 'Rollout Roadmap','1-Page Plan'],
      microProof: 'Clear path to adopting AI in your business',
      details: [
        'A quick review of your workflows to discover time/money leaks',
        'Top 3 AI opportunities',
        'Select the #1 ROI “first build” opportunity',
        'Recommended tools + what connects to what, and how',
        'A custom map with milestones',
        'A custom timeline (what to do first, next, later)'
      ]
    },
       {
      icon: Settings,
      title: 'Ops & Workflow Automation',
      description: 'Replace repetitive tasks with AI systems, that never forget or make mistakes, so your team can unlock creativity and focus on revenue first tasks.',
      bullets: ['Data Sync', 'Reporting', 'Ticketing', 'Slack Ops', 'Approvals'],
      microProof: 'Typical: −30–60% handling time.',
      details: [
        'Real-time bi-directional data sync across all platforms',
        'Automated reporting dashboards with custom KPIs',
        'Smart ticket routing with priority-based escalation',
        'Slack-integrated ops center with intelligent notifications',
        'Automated approval chains with compliance tracking',
        'Legacy system integrations and data migration'
      ]
    }
  ];

  const openPlaybookModal = () => {
    console.log('Opening implementation playbook modal...');
  };

  return (
    <section id="services" className="py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-headline font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-gray-400 text-lg mt-3 tracking-wider">
            Ai Automation • Consulting • Integration
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`bg-black border border-gray-800 rounded-xl p-8 relative overflow-hidden group transition-all duration-300 ${index === 1 ? 'cursor-pointer' : ''}`}
              whileHover={{
                y: -2,
                transition: { duration: 0.2 }
              }}
              onClick={() => {
                if (index === 1) {
                  window.location.href = 'https://aiessentials.us/free-ai-revenue-and-savings-plan';
                }
              }}
            >
              {/* Iridescent border glow on hover */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />

              {/* Inner glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-purple-500/5 to-yellow-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <service.icon className="w-8 h-8 text-cyan-400 mr-3" />
                  <h3 className="font-headline font-bold text-2xl">{service.title}</h3>
                </div>

              <p className="text-gray-400 mb-6 leading-relaxed">{service.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {service.bullets.map((bullet, bulletIndex) => (
                  <span
                    key={bulletIndex}
                    className="text-xs bg-gray-900 text-gray-300 px-3 py-1 rounded-full"
                  >
                    {bullet}
                  </span>
                ))}
              </div>

              <div className="mb-6 p-3 bg-gray-950/50 rounded-lg border border-gray-800">
                <p className="text-sm text-cyan-400 font-medium">{service.microProof}</p>
              </div>

              <button
                onClick={(e) => {
                  if (index === 1) {
                    e.stopPropagation();
                    window.location.href = 'https://aiessentials.us/free-ai-revenue-and-savings-plan';
                  } else {
                    setSelectedService(selectedService === index ? null : index);
                  }
                }}
                className="text-gray-400 hover:text-white text-sm uppercase tracking-wider transition-colors duration-200 flex items-center group/btn"
              >
                LEARN MORE
                <ChevronRight className="w-4 h-4 ml-1 transition-transform duration-200 group-hover/btn:translate-x-1" />
              </button>

              {selectedService === index && index !== 1 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-4 border-t border-gray-800"
                >
                  <ul className="space-y-2">
                    {service.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="text-sm text-gray-400 flex items-start">
                        <span className="text-cyan-400 mr-2">•</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default Services;