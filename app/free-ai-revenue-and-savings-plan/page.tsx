'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import ROIAnalysisGraphic from '@/components/service-pages/ROIAnalysisGraphic';
import BookingForm from '@/components/service-pages/BookingForm';
import ServicePageHeader from '@/components/service-pages/ServicePageHeader';
import ServicePageFooter from '@/components/service-pages/ServicePageFooter';
import { InteractiveRobot } from '@/components/service-pages/InteractiveRobot';

export default function FreeAIRevenueSavingsPlan() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const openCalendly = () => {
    window.open('https://calendly.com/iliyan-ivanov-mp/discovery-call-with-aiessentials', '_blank');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <ServicePageHeader />
      {/* Section 1: Hero */}
      <section className="relative pt-16 pb-4 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 overflow-hidden min-h-screen flex items-start">
        <div className="max-w-7xl mx-auto w-full pt-24 md:pt-32 lg:pt-36 xl:pt-40 2xl:pt-44">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col items-center text-center space-y-4 xl:space-y-6 2xl:space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full relative"
            >
              <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none -translate-y-[40%] xl:-translate-y-[45%] 2xl:-translate-y-[50%]">
                <InteractiveRobot />
              </div>
              <div className="relative z-10">
                <ROIAnalysisGraphic />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-headline font-bold text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl leading-tight max-w-4xl xl:max-w-5xl 2xl:max-w-6xl"
            >
              Free <span className="gradient-text">AI Revenue + Savings</span> Plan
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-sm sm:text-base xl:text-lg 2xl:text-xl text-gray-300/90 leading-snug max-w-2xl xl:max-w-3xl 2xl:max-w-4xl"
            >
              Get a custom AI Revenue + Savings Plan in 30 minutes, so you know exactly the top 3 opportunities for AI to save or make money for your business—without
              wasting months experimenting with tools or spending a single cent.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-3 xl:gap-4 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: '#e5e5e5' }}
                whileTap={{ scale: 0.95 }}
                onClick={openCalendly}
                className="bg-white text-black font-bold px-5 py-2 xl:px-7 xl:py-3 2xl:px-8 2xl:py-4 transition-colors uppercase text-xs xl:text-sm tracking-wide"
              >
                Get My Free AI Plan
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(17, 24, 39, 1)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('what-you-get')?.scrollIntoView({ behavior: 'smooth' })}
                className="border border-gray-700 text-white font-bold px-5 py-2 xl:px-7 xl:py-3 2xl:px-8 2xl:py-4 transition-colors uppercase text-xs xl:text-sm tracking-wide"
              >
                See What You Get
              </motion.button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-xs xl:text-sm 2xl:text-base text-gray-500"
            >
              • No commitment • Completely Custom • Free
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Section 2: What You Get */}
      <section id="what-you-get" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="font-headline font-bold text-4xl sm:text-5xl text-center mb-16"
          >
            What <span className="gradient-text">You Get</span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="relative bg-gradient-to-br from-cyan-950/50 via-gray-950 to-gray-950 border border-cyan-500/30 rounded-xl p-8 space-y-4 overflow-hidden group hover:border-cyan-500/50 transition-all"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all"></div>
              <div className="relative">
                <div className="inline-block bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 font-bold text-lg px-4 py-1 rounded-full mb-4">01</div>
                <h3 className="font-headline font-bold text-2xl mb-4 text-white">
                  30-Min AI Opportunity Scan
                </h3>
                <p className="text-gray-400 mb-4">In a 30-minute consultation you will get:</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">A quick review of your workflows to discover time/money leaks</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">Top 3 AI opportunities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">Select the #1 ROI "first build" opportunity</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -top-6 left-0 right-0 flex items-center justify-center">
                <div className="bg-gray-900/80 border border-gray-700/50 px-3 py-1 rounded-full">
                  <span className="text-xs text-gray-400 font-medium">Delivered after the call</span>
                </div>
              </div>
              <div className="relative bg-gradient-to-br from-purple-950/50 via-gray-950 to-gray-950 border border-purple-500/30 rounded-xl p-8 space-y-4 overflow-hidden group hover:border-purple-500/50 transition-all">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all"></div>
                <div className="relative">
                  <div className="inline-block bg-purple-500/20 border border-purple-500/50 text-purple-400 font-bold text-lg px-4 py-1 rounded-full mb-4">02</div>
                  <h3 className="font-headline font-bold text-2xl mb-4 text-white">
                    1-Page AI Revenue + Savings Plan
                  </h3>
                  <p className="text-gray-400 mb-4">Delivered in 48 hours. A clear decision ready plan that shows:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Recommended tools + what connects to what, and how</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Required data/integration guide</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Projected impact (time saved / cost reduced / revenue upside)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -top-6 left-0 right-0 flex items-center justify-center">
                <div className="bg-gray-900/80 border border-gray-700/50 px-3 py-1 rounded-full">
                  <span className="text-xs text-gray-400 font-medium">Delivered after the call</span>
                </div>
              </div>
              <div className="relative bg-gradient-to-br from-yellow-950/50 via-gray-950 to-gray-950 border border-yellow-600/30 rounded-xl p-8 space-y-4 overflow-hidden group hover:border-yellow-600/50 transition-all">
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-600/10 rounded-full blur-3xl group-hover:bg-yellow-600/20 transition-all"></div>
                <div className="relative">
                  <div className="inline-block bg-yellow-600/20 border border-yellow-600/50 text-yellow-500 font-bold text-lg px-4 py-1 rounded-full mb-4">03</div>
                  <h3 className="font-headline font-bold text-2xl mb-4 text-white">
                    Detailed Rollout Roadmap:
                  </h3>
                  <p className="text-gray-400 mb-4">Your custom execution guide to get your AI system going immediately:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Step-by-step system to build your #1 ROI AI system</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">A custom map with milestones</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">A custom timeline (what to do first, next, later)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-br from-purple-900/30 to-transparent border border-purple-800/50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  BONUS 1
                </div>
              </div>
              <p className="text-gray-300">Custom Prompts for your industry</p>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-transparent border border-purple-800/50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  BONUS 2
                </div>
              </div>
              <p className="text-gray-300">Lifetime access to a bonus free consultation call</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: Why This Works */}
      <section id="why-this-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="font-headline font-bold text-4xl sm:text-5xl"
          >
            Why <span className="gradient-text">This Works</span>
          </motion.h2>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="font-headline font-bold text-3xl mb-4 text-white" style={{ textShadow: '0 0 20px rgba(255, 255, 255, 0.5), 0 0 40px rgba(255, 255, 255, 0.3)' }}>
                The Common Problem
              </h3>
              <p className="text-xl text-gray-400">
                Most teams spend months "experimenting with AI," often leading only to wasted time and wasted money.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="border-t border-b border-gray-800 py-8"
            >
              <h3 className="font-headline font-bold text-4xl mb-4 text-white" style={{ textShadow: '0 0 20px rgba(255, 255, 255, 0.5), 0 0 40px rgba(255, 255, 255, 0.3)' }}>
                This Is The Opposite.
              </h3>
              <p className="text-xl text-gray-300 leading-relaxed">
                We show you where AI can pay off first + a plan you can execute, before you invest.
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-2xl text-white font-semibold"
            >
              We help you turn AI from a distraction into a business advantage.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Section 4: How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="font-headline font-bold text-4xl sm:text-5xl text-center mb-16"
          >
            How <span className="gradient-text">It Works</span> (3 Steps)
          </motion.h2>

          <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-6 lg:gap-4 mb-12">
            <div className="relative bg-gradient-to-br from-cyan-950/50 via-gray-950 to-gray-950 border border-cyan-500/30 rounded-xl p-8 space-y-4 overflow-hidden group hover:border-cyan-500/50 transition-all flex-1">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all"></div>
              <div className="relative">
                <div className="inline-block bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 font-bold text-lg px-4 py-1 rounded-full mb-4">01</div>
                <h3 className="font-headline font-bold text-2xl mb-4 text-white">
                  Book your free 30-minute call
                </h3>
                <p className="text-gray-400">
                  Answer a few questions so we can prepare.
                </p>
              </div>
            </div>

            <div className="hidden lg:flex items-center justify-center text-cyan-400 text-4xl font-bold px-4">
              →
            </div>

            <div className="relative bg-gradient-to-br from-purple-950/50 via-gray-950 to-gray-950 border border-purple-500/30 rounded-xl p-8 space-y-4 overflow-hidden group hover:border-purple-500/50 transition-all flex-1">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all"></div>
              <div className="relative">
                <div className="inline-block bg-purple-500/20 border border-purple-500/50 text-purple-400 font-bold text-lg px-4 py-1 rounded-full mb-4">02</div>
                <h3 className="font-headline font-bold text-2xl mb-4 text-white">
                  Get the AI Revenue + Savings Call
                </h3>
                <p className="text-gray-400">
                  In 30 minutes, you'll know the top 3 AI systems that will give you leverage in your business and choose the best ROI first system.
                </p>
              </div>
            </div>

            <div className="hidden lg:flex items-center justify-center text-purple-400 text-4xl font-bold px-4">
              →
            </div>

            <div className="relative bg-gradient-to-br from-yellow-950/50 via-gray-950 to-gray-950 border border-yellow-600/30 rounded-xl p-8 space-y-4 overflow-hidden group hover:border-yellow-600/50 transition-all flex-1">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-600/10 rounded-full blur-3xl group-hover:bg-yellow-600/20 transition-all"></div>
              <div className="relative">
                <div className="inline-block bg-yellow-600/20 border border-yellow-600/50 text-yellow-500 font-bold text-lg px-4 py-1 rounded-full mb-4">03</div>
                <h3 className="font-headline font-bold text-2xl mb-4 text-white">
                  You get your custom plan in 48 hours
                </h3>
                <p className="text-gray-400">
                  A 1-page AI Revenue + Savings Plan™ + a rollout roadmap.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center space-y-6">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#e5e5e5' }}
              whileTap={{ scale: 0.95 }}
              onClick={openCalendly}
              className="bg-white text-black font-bold px-8 py-3 transition-colors uppercase text-sm tracking-wide"
            >
              Get My Free AI Plan
            </motion.button>

            <div className="space-y-4 max-w-3xl mx-auto">
              <div className="relative bg-gradient-to-br from-green-950/50 to-gray-950 border-2 border-green-500/50 rounded-xl p-8 overflow-hidden group hover:border-green-500 transition-all">
                <div className="absolute top-0 right-0 w-40 h-40 bg-green-500/10 rounded-full blur-3xl group-hover:bg-green-500/20 transition-all"></div>
                <div className="relative">
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-green-500/20 border border-green-500/50 text-green-400 font-bold text-sm px-4 py-1.5 rounded-full uppercase tracking-wide">
                      Our Guarantee
                    </div>
                  </div>
                  <p className="text-white text-xl font-semibold text-center">
                    If we can't identify 3 clear AI opportunities and 1 best "first move," we'll extend the session to 60 minutes.
                  </p>
                </div>
              </div>

              <div className="relative bg-gradient-to-br from-red-950/50 to-gray-950 border-2 border-red-500/50 rounded-xl p-8 overflow-hidden group hover:border-red-500 transition-all">
                <div className="absolute top-0 right-0 w-40 h-40 bg-red-500/10 rounded-full blur-3xl group-hover:bg-red-500/20 transition-all"></div>
                <div className="relative">
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-red-500/20 border border-red-500/50 text-red-400 font-bold text-sm px-4 py-1.5 rounded-full uppercase tracking-wide">
                      Limited Availability
                    </div>
                  </div>
                  <p className="text-white text-xl font-semibold text-center">
                    To keep plans custom and delivered within 48 hours, we only create <span className="text-red-400 font-bold">10 AI Plans per week</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Who This Is For */}
      <section id="who-this-is-for" className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="font-headline font-bold text-4xl sm:text-5xl text-center mb-16"
          >
            Who <span className="gradient-text">This Is For</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            <div className="bg-green-900/20 border border-green-800/50 rounded-xl p-8">
              <h3 className="font-headline font-bold text-2xl mb-6 text-green-400">
                This is for you if:
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-lg">You have repeatable workflows (sales, ops, admin, support, reporting, delivery)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-lg">You're wasting time on manual processes or bottlenecks</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-lg">You want AI applied practically (not "AI education")</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-lg">You're open to implementing improvements in the next 90 days</span>
                </li>
              </ul>
            </div>

            <div className="bg-red-900/20 border border-red-800/50 rounded-xl p-8">
              <h3 className="font-headline font-bold text-2xl mb-6 text-red-400">
                Not a fit if:
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 flex-shrink-0 mt-0.5 text-red-400 text-2xl">×</div>
                  <span className="text-gray-300 text-lg">You're only "curious about AI"</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 flex-shrink-0 mt-0.5 text-red-400 text-2xl">×</div>
                  <span className="text-gray-300 text-lg">You have no stable processes yet</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 flex-shrink-0 mt-0.5 text-red-400 text-2xl">×</div>
                  <span className="text-gray-300 text-lg">You want a generic tool list instead of a tailored plan</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 6: FAQ */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="font-headline font-bold text-4xl sm:text-5xl text-center mb-16"
          >
            <span className="gradient-text">FAQ</span>
          </motion.h2>

          <div className="space-y-4">
            {[
              {
                question: "How is this different from an AI consulting call?",
                answer: "You don't get ideas—you get a deliverable: a 1-page ROI plan + an execution roadmap."
              },
              {
                question: "What do I need before the call?",
                answer: "Nothing. If you can explain your workflow and tools, we can map the opportunities."
              },
              {
                question: "Do you implement the system too?",
                answer: "If you want us to, we can discuss implementation options after you receive your plan. No pressure."
              },
              {
                question: "How fast is delivery?",
                answer: "Your plan is delivered within 48 hours after the call."
              },
              {
                question: "Is it really free?",
                answer: "Yes—free call, free plan, no commitment."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-800/50 transition-colors"
                >
                  <h3 className="font-headline font-bold text-xl pr-4">
                    {faq.question}
                  </h3>
                  {expandedFaq === index ? (
                    <ChevronUp className="h-6 w-6 text-cyan-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-6 w-6 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-400 text-lg">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Final CTA */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.3] bg-center bg-no-repeat bg-contain"
          style={{ backgroundImage: 'url(/wireframerocket_bg_0d0d0d.png)', backgroundPosition: 'center 30%' }}
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center space-y-8 relative z-10"
        >
          <h2 className="font-headline font-bold text-4xl sm:text-5xl leading-tight">
            Ready to see where AI can add revenue + savings in your business?
          </h2>

          <p className="text-xl text-gray-300">
            Book your free AI Revenue + Savings Plan™ call and get your 1-page plan in 48 hours.
          </p>
          <p className="text-xl text-gray-400">
            Discover where AI will add profit in your business — before you spend a cent.
          </p>

          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: '#e5e5e5' }}
            whileTap={{ scale: 0.95 }}
            onClick={openCalendly}
            className="bg-white text-black font-bold px-8 py-3 transition-colors uppercase text-sm tracking-wide"
          >
            Get My Free AI Plan
          </motion.button>
        </motion.div>
      </section>

      {/* Section 8: Form */}
      <section id="booking-form" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-950">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="font-headline font-bold text-4xl sm:text-5xl text-center mb-12">
            Book Your Call
          </h2>

          <BookingForm />
        </motion.div>
      </section>

      <ServicePageFooter />
    </div>
  );
}
