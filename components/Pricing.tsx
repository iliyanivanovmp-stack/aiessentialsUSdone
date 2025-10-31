'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { X } from 'lucide-react';

const Pricing = () => {
  const [showGuarantee, setShowGuarantee] = useState(false);
  const tiers = [
    {
      name: 'Starter',
      setup: '$2,500',
      monthly: '$900',
      description: '1 core automation, basic support, ROI review @ 30 days',
      popular: false
    },
    {
      name: 'Growth',
      setup: '$6,000',
      monthly: '$2,500',
      description: '3–5 automations, playbooks, priority support',
      popular: true
    },
    {
      name: 'Scale',
      setup: 'Custom',
      monthly: '',
      description: 'Bespoke systems, workshops, SLA, security reviews',
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-24 px-6 md:px-12 bg-gray-950/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-headline font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4">
            Start small. <span className="gradient-text">Scale fast.</span>
          </h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`bg-black border rounded-2xl p-8 relative ${
                tier.popular 
                  ? 'border-white' 
                  : 'border-gray-800 hover:border-gray-600'
              } transition-all duration-300 hover:transform hover:-translate-y-1 flex flex-col`}
              whileHover={tier.popular ? {} : { 
                y: -4,
                boxShadow: '0 0 30px rgba(0, 255, 255, 0.2)'
              }}
            >
              {/* Iridescent glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-yellow-400/20 opacity-0 hover:opacity-100 transition-opacity duration-300 blur-sm" />
              
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-white text-black px-4 py-1 text-xs uppercase font-semibold tracking-wider">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center relative z-10">
                <h3 className="font-headline font-bold text-2xl mb-4">{tier.name}</h3>
                
                <div className="mb-6">
                  <div className="text-4xl font-bold mb-2">
                    {tier.setup}
                    {tier.monthly && <span className="text-lg text-gray-400"> setup</span>}
                  </div>
                  {tier.monthly && (
                    <div className="text-2xl text-gray-300">
                      {tier.monthly}<span className="text-sm">/mo</span>
                    </div>
                  )}
                  {tier.name === 'Scale' && (
                    <div className="text-lg text-gray-400 mt-2">
                      Contact Sales
                    </div>
                  )}
                </div>
                
                <p className="text-gray-400 text-center leading-relaxed mb-8 flex-grow">
                  {tier.description}
                </p>
                
                <div className="mt-auto">
                  <button 
                    onClick={() => window.open('https://calendly.com/iliyan-ivanov-mp/discovery-call-with-aiessentials', '_blank')}
                    className={`w-full py-3 text-sm uppercase tracking-wider font-semibold transition-all duration-200 ${
                  tier.popular
                    ? 'bg-white text-black hover:bg-gray-200'
                    : 'border border-gray-600 text-white hover:border-white hover:bg-white hover:text-black'
                  }`}>
                    GET STARTED
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12 space-y-3"
        >
          <p className="text-gray-400 text-base">
            If your ROI isn't met, you don't pay
          </p>
          <p className="text-gray-500 text-sm">
            Month-to-month. Cancel anytime.
          </p>
          <button
            onClick={() => setShowGuarantee(true)}
            className="text-gray-500 text-sm hover:text-white transition-colors duration-200 underline"
          >
            Our Money-back Guarantee
          </button>
        </motion.div>
      </div>

      {showGuarantee && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-gray-900 border border-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-800">
              <h2 className="text-2xl font-bold text-white">Money-back Guarantee</h2>
              <button
                onClick={() => setShowGuarantee(false)}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="overflow-y-auto p-6 text-gray-300 text-sm leading-relaxed space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Aiessentials — 60-Day Money-Back Guarantee (Performance Guarantee Terms)</h3>
                <p className="text-gray-400">Website: aiessentials.us</p>
                <p className="text-gray-400">Operator: IvanovIv LLC, 30 N Gould St Ste N, Sheridan, WY 82801</p>
                <p className="text-gray-400 mt-2">Effective date: October 31, 2025</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-2">1) What you're buying</h4>
                <p>You are purchasing a custom AI system designed after a discovery call (the "Solution"). We'll send a short Solution Summary (email or PDF) listing deliverables and any access we need.</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-2">2) Our guarantee</h4>
                <p className="mb-3">If you don't achieve the agreed Desired Results within 60 days of Kickoff, we'll refund your service fee.</p>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Kickoff</strong> = the later of (a) the date we send the Solution Summary, or (b) the date we receive all required access/inputs.</li>
                  <li><strong>Desired Results</strong> = the single measurable target in Exhibit A (baseline + target metric).</li>
                  <li><strong>60 days</strong> = 60 consecutive calendar days from Kickoff.</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-2">3) Your part (conditions)</h4>
                <p className="mb-3">To qualify for a refund, you agree to:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Approve Exhibit A (goal, baseline, metric, data source).</li>
                  <li>Provide timely access to accounts, data, and tools within 5 business days of request.</li>
                  <li>Implement the changes/automations we deliver (or document blockers in writing).</li>
                  <li>Run at reasonable volume (see Exhibit A minimums) so results are measurable.</li>
                  <li>Avoid conflicting changes that defeat measurement without notifying us.</li>
                </ul>
                <p className="mt-3 italic text-gray-400">Disclosure note: When advertising a "money-back guarantee," disclose these material conditions clearly wherever you make the claim (e.g., checkout, sales page).</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-2">4) How to claim</h4>
                <p className="mb-3">Email info@aiessentials.us with subject "Guarantee Refund Request" within 10 days after the 60‑day period, attaching:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>the approved Exhibit A, and</li>
                  <li>a dashboard/report showing results vs. target, and</li>
                  <li>a short note confirming you met the conditions above.</li>
                </ul>
                <p className="mt-3">We'll approve/deny within 10 business days and, if approved, refund to the original payment method within 5 business days.</p>
                <p className="mt-3"><strong>Processor fees:</strong> Card processors like Stripe typically do not return processing fees on refunds. Our default is to refund your full service fee and we absorb Stripe's fee, unless Exhibit A says otherwise.</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-2">5) Exclusions</h4>
                <ul className="list-disc list-inside space-y-2">
                  <li>Third‑party spend (APIs, SaaS, ad spend) isn't refundable.</li>
                  <li>Force‑majeure/platform outages aren't covered.</li>
                  <li>If Section 3 isn't met, the guarantee doesn't apply.</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-2">6) Informal resolution & governing law</h4>
                <p>We'll try to resolve issues informally within 14 days of written notice. Governing law: Wyoming, USA.</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Pricing;