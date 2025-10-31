'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How fast can we go live?',
      answer: 'Most first automations go live in 14-30 days after discovery.'
    },
    {
      question: 'What tools do you use?',
      answer: 'We fit into your stack (n8n/Zapier/Pipedream, Slack, HubSpot/Salesforce, GSheets/DB, OpenAI/Anthropic, etc.).'
    },
    {
      question: 'Data security?',
      answer: 'We follow least-privilege access, log all automations, and can work within your VPC.'
    },
    {
      question: 'Will you replace my team?',
      answer: 'No. We remove repetitive tasks so your team can focus on higher-value work.'
    },
    {
      question: 'What if ROI isn\'t clear?',
      answer: 'We don\'t build it. Your ROI Map shows potential impact before any commitment.'
    },
    {
      question: 'Who maintains the systems?',
      answer: 'We can own maintenance or train your team - choice is yours. Training your team comes at a higher cost.'
    }
  ];

  return (
    <section id="faq" className="py-24 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-headline font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight">
            Straight answers. <span className="gradient-text">No hype.</span>
          </h2>
        </motion.div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-black border border-gray-800 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-950 transition-colors duration-200"
              >
                <span className="font-semibold text-lg">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-8 pb-6"
                >
                  <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;