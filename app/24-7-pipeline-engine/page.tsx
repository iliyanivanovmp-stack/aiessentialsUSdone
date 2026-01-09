'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ChevronDown, ChevronUp, XCircle, X } from 'lucide-react';
import PipelineROIAnalysisGraphic from '@/components/service-pages/pipeline-engine/PipelineROIAnalysisGraphic';
import BookingForm from '@/components/service-pages/BookingForm';
import PipelineHeader from '@/components/service-pages/pipeline-engine/PipelineHeader';
import ServicePageFooter from '@/components/service-pages/ServicePageFooter';
import { InteractiveRobot } from '@/components/service-pages/InteractiveRobot';

export default function PipelineEnginePage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showGuarantee, setShowGuarantee] = useState(false);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const openCalendly = () => {
    window.open('https://calendly.com/iliyan-ivanov-mp/free-pipeline-diagnostic-call', '_blank');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <PipelineHeader />
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
                <PipelineROIAnalysisGraphic />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-headline font-bold text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl leading-tight max-w-4xl xl:max-w-5xl 2xl:max-w-6xl"
            >
               <span className="gradient-text">24/7 Pipeline Engine</span> - Book consistent meetings every month.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-sm sm:text-base xl:text-lg 2xl:text-xl text-gray-300/90 leading-snug max-w-2xl xl:max-w-3xl 2xl:max-w-4xl"
            >
              A CRM-integrated outbound system that generates a minimum of 5 qualified meetings/month without hiring SDRs, relying on referrals, or doing daily manual outreach.
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
               Apply (Free AI Pipeline Diagnostic)
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
              Free diagnostic • No obligation • We&apos;ll tell you what&apos;s broken either way
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
                  Free AI Pipeline Diagnostic
                </h3>
                <p className="text-gray-400 mb-4">In a 30-minute consultation you will get:</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">A quick review of your pipeline and workflows to discover time/money leaks</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">Top 3 problems</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">Select the #1 ROI pipeline strategy to fix the 3 problems</span>
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
              <div className="absolute -top-6 left-0 right-0 flex items-center justify-center z-10">
                <div className="bg-gray-900/80 border border-gray-700/50 px-5 py-2 rounded-full">
                  <span className="text-sm text-gray-400 font-medium">Option 1:</span>
                </div>
              </div>
              <div className="relative bg-gradient-to-br from-purple-950/50 via-gray-950 to-gray-950 border border-purple-500/30 rounded-xl p-8 space-y-4 overflow-hidden group hover:border-purple-500/50 transition-all">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all"></div>
                <div className="relative">
                  <div className="inline-block bg-purple-500/20 border border-purple-500/50 text-purple-400 font-bold text-lg px-4 py-1 rounded-full mb-4">02</div>
                  <h3 className="font-headline font-bold text-2xl mb-4 text-white">
                    Hands-Off Pipeline Engine (Done-For-You)
                  </h3>
                  <p className="text-gray-400 mb-4">A &ldquo;Full Hands-Off System&rdquo; that requires you to only attend booked meetings:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">ICP targeting (who we target, why, where)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Lead List building + enrichment (build a database)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Offer Creation + Copywriting Assets (sequences that convert)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Infrastructure + Automation (domains/inboxes/tracking/)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Automated Follow-up and Reply Handling (turn &ldquo;maybes&rdquo; into meetings)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">CRM integration + reporting (pipeline visibility end-to-end)</span>
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
              <div className="absolute -top-6 left-0 right-0 flex items-center justify-center z-10">
                <div className="bg-gray-900/80 border border-gray-700/50 px-5 py-2 rounded-full">
                  <span className="text-sm text-gray-400 font-medium">Option 2</span>
                </div>
              </div>
              <div className="relative bg-gradient-to-br from-yellow-950/50 via-gray-950 to-gray-950 border border-yellow-600/30 rounded-xl p-8 space-y-4 overflow-hidden group hover:border-yellow-600/50 transition-all">
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-600/10 rounded-full blur-3xl group-hover:bg-yellow-600/20 transition-all"></div>
                <div className="relative">
                  <div className="inline-block bg-yellow-600/20 border border-yellow-600/50 text-yellow-500 font-bold text-lg px-4 py-1 rounded-full mb-4">03</div>
                  <h3 className="font-headline font-bold text-2xl mb-4 text-white">
                    Build + Handoff System:
                  </h3>
                  <p className="text-gray-400 mb-4">We build your system, integrate it with your CRM and we hand it off to you. (Your team replies and follow-ups on leads)</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">ICP targeting (who we target, why, where)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Lead List building + enrichment (build a database)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <XCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 line-through">Offer Creation + Copywriting Assets (sequences that convert)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Infrastructure + Automation (domains/inboxes/tracking/)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <XCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 line-through">Automated Follow-up and Reply Handling (turn &ldquo;maybes&rdquo; into meetings)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">CRM integration + reporting (pipeline visibility end-to-end)</span>
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
              <p className="text-gray-300">&ldquo;No-Show Killer&rdquo; Booking Kit reminder sequence + confirmation scripts + reschedule flow</p>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-transparent border border-purple-800/50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  BONUS 2
                </div>
              </div>
              <p className="text-gray-400/70 text-sm mb-2">Only For Hands-Off Pipeline Engine</p>
              <p className="text-gray-300">Lifetime access to a bonus free consultation call</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-12 space-y-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#e5e5e5' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-black font-bold px-10 py-4 transition-colors uppercase text-base tracking-wide"
            >
              Get My Package
            </motion.button>
            <p className="text-sm text-gray-400">
              <button
                onClick={() => setShowGuarantee(true)}
                className="underline hover:text-white transition-colors"
              >
                Our Money-Back Guarantee
              </button>
            </p>
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
                Most agencies don&apos;t have a &ldquo;lead problem.&rdquo; They have a consistency problem. Inconsistent pipeline kills stable growth.
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
               THE SOLUTION.
              </h3>
              <p className="text-xl text-gray-300 leading-relaxed">
                It&apos;s a complete outbound system that runs daily and turns cold prospects into booked meetings—while syncing everything into your CRM.
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
                  Book your free 30-Min AI Pipeline Diagnostic
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
                  You get a recommended setup
                </h3>
                <p className="text-gray-400">
                  Based on what we find, we recommend the highest impact option that will bring more leads.
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
                  We launch your 24/7 Pipeline Engine
                </h3>
                <p className="text-gray-400">
                 You get your system built and deployed so it starts producing more leads for your business.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center space-y-6">
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
                    If we don&apos;t book at least 5 qualified meetings in a 30-day period, we work for free until we do.
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
                    To keep systems custom and delivered within a good timeframe, we take only <span className="text-red-400 font-bold">5 Calls per week</span>.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: '#e5e5e5' }}
                whileTap={{ scale: 0.95 }}
                onClick={openCalendly}
                className="bg-white text-black font-bold px-10 py-4 transition-colors uppercase text-base tracking-wide"
              >
                Apply for Free Diagnostic
              </motion.button>
              <p className="text-sm text-gray-400">
                <button
                  onClick={() => setShowGuarantee(true)}
                  className="underline hover:text-white transition-colors"
                >
                  Our Money-Back Guarantee
                </button>
              </p>
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
                  <span className="text-gray-300 text-lg">You have inconsistent pipeline</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-lg">You have a clear service offer</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-lg">You can handle 5+ meetings/month</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-lg">You&apos;re open to implementing improvements in the next 90 days</span>
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
                  <span className="text-gray-300 text-lg">You&apos;re &ldquo;AI curious&rdquo; but won&apos;t execute</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 flex-shrink-0 mt-0.5 text-red-400 text-2xl">×</div>
                  <span className="text-gray-300 text-lg">You don&apos;t have a defined offer yet</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 flex-shrink-0 mt-0.5 text-red-400 text-2xl">×</div>
                  <span className="text-gray-300 text-lg">You want overnight magic without the dedication to build a scalable lead system</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 6: Pricing */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="font-headline font-bold text-4xl sm:text-5xl text-center mb-8"
          >
            <span className="gradient-text">Pricing</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-2xl text-white font-bold mb-4">What You Get (Included in Every Build)</h3>
            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-2">
                <span className="text-gray-300">ICP + targeting map (agency-specific)</span>
              </div>
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-2">
                <span className="text-gray-300">Lead list system + enrichment rules</span>
              </div>
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-2">
                <span className="text-gray-300">Cold email copy + sequences</span>
              </div>
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-2">
                <span className="text-gray-300">Inbox + tracking setup</span>
              </div>
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-2">
                <span className="text-gray-300">CRM integration</span>
              </div>
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-2">
                <span className="text-gray-300">Booking flow</span>
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative bg-gradient-to-br from-purple-950/50 via-gray-950 to-gray-950 border-2 border-purple-500/50 rounded-xl p-8 space-y-6 overflow-hidden group hover:border-purple-500 transition-all"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-headline font-bold text-3xl text-white">
                    Hands-Off Pipeline Engine
                  </h3>
                  <div className="bg-purple-500/20 border border-purple-500/50 text-purple-400 font-bold text-xs px-3 py-1 rounded-full">
                    OPTION A
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-4xl font-bold text-white mb-2">
                    $2,500 <span className="text-xl text-gray-400">setup</span>
                  </div>
                  <div className="text-3xl font-bold text-purple-400">
                    + $400<span className="text-lg text-gray-400">/month</span>
                  </div>
                </div>

                <p className="text-gray-300 text-lg mb-6">
                  Best for agencies that want pipeline without touching ops. You only show up when it&apos;s time for a call.
                </p>

                <div className="space-y-3 mb-8">
                  <h4 className="font-bold text-white text-lg mb-4">Includes:</h4>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">Campaign launch + daily monitoring</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">Inbox management + replies handled by us</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">Qualification + scheduling</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">Follow-ups + reactivation</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">Weekly optimization + KPI report</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02, backgroundColor: '#e5e5e5' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={openCalendly}
                    className="w-full bg-white text-black font-bold px-8 py-4 transition-colors uppercase text-sm tracking-wide"
                  >
                    Apply (Free AI Pipeline Diagnostic)
                  </motion.button>
                  <p className="text-sm text-gray-400 text-center">
                    <button
                      onClick={() => setShowGuarantee(true)}
                      className="underline hover:text-white transition-colors"
                    >
                      Our Money-Back Guarantee
                    </button>
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="relative bg-gradient-to-br from-yellow-950/50 via-gray-950 to-gray-950 border-2 border-yellow-600/50 rounded-xl p-8 space-y-6 overflow-hidden group hover:border-yellow-600 transition-all"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-600/10 rounded-full blur-3xl group-hover:bg-yellow-600/20 transition-all"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-headline font-bold text-3xl text-white">
                    Build + Handoff Engine
                  </h3>
                  <div className="bg-yellow-600/20 border border-yellow-600/50 text-yellow-500 font-bold text-xs px-3 py-1 rounded-full">
                    OPTION B
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-4xl font-bold text-white mb-2">
                    $1,500 <span className="text-xl text-gray-400">one-time</span>
                  </div>
                </div>

                <p className="text-gray-300 text-lg mb-6">
                  Best for agencies that want the system installed but prefer to handle replies in-house.
                </p>

                <div className="space-y-3 mb-8">
                  <h4 className="font-bold text-white text-lg mb-4">Includes:</h4>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">System build + launch</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">Reply playbook + handoff rules</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">Sequences up to first point of contact</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">CRM connected so your team manages pipeline</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02, backgroundColor: '#e5e5e5' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={openCalendly}
                    className="w-full bg-white text-black font-bold px-8 py-4 transition-colors uppercase text-sm tracking-wide"
                  >
                    Apply (Free AI Pipeline Diagnostic)
                  </motion.button>
                  <p className="text-sm text-gray-400 text-center">
                    <button
                      onClick={() => setShowGuarantee(true)}
                      className="underline hover:text-white transition-colors"
                    >
                      Our Money-Back Guarantee
                    </button>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Unified gradient background for FAQ, Final CTA, and Booking Form */}
      <div className="bg-gradient-to-b from-black to-gray-950">

      {/* Section 7: FAQ */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8">
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
                question: "Is the diagnostic really free?",
                answer: "Yes. If it's not a fit, you'll still leave knowing what's blocking your pipeline."
              },
              {
                question: "What do I need before the call?",
                answer: "Nothing. If you can explain your workflow and tools, we can map the opportunities."
              },
              {
                question: "Do you integrate with our CRM?",
                answer: "Yes—both options connect into your CRM so pipeline is trackable end-to-end."
              },
              {
                question: "How fast can we launch?",
                answer: "Typically within 21 days depending on approvals and access."
              },
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

        {/* Final CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center opacity-25 pointer-events-none scale-125">
            <PipelineROIAnalysisGraphic />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center space-y-8 relative z-10"
          >
            <h2 className="font-headline font-bold text-4xl sm:text-5xl leading-tight">
              Ready to make your pipeline consistent with AI?

            </h2>

            <p className="text-xl text-gray-300">
              Start with the free diagnostic and we&apos;ll recommend the best-fit setup.
            </p>

            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#e5e5e5' }}
              whileTap={{ scale: 0.95 }}
              onClick={openCalendly}
              className="bg-white text-black font-bold px-8 py-3 transition-colors uppercase text-sm tracking-wide"
            >
              Apply (Free AI Pipeline Diagnostic)
            </motion.button>

            <p className="text-sm text-gray-400 -mt-2">
              Limited monthly capacity.
            </p>
          </motion.div>
        </section>

        {/* Booking Form */}
        <section id="booking-form" className="py-20 px-4 sm:px-6 lg:px-8">
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
      </div>

      <ServicePageFooter />

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
                <h4 className="text-lg font-semibold text-white mb-2">1) What you&apos;re buying</h4>
                <p>You are purchasing a custom AI system designed after a discovery call (the &ldquo;Solution&rdquo;). We&apos;ll send a short Solution Summary (email or PDF) listing deliverables and any access we need.</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-2">2) Our guarantee</h4>
                <p className="mb-3">If you don&apos;t achieve the agreed Desired Results within 60 days of Kickoff, we&apos;ll refund your service fee.</p>
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
                <p className="mt-3 italic text-gray-400">Disclosure note: When advertising a &ldquo;money-back guarantee,&rdquo; disclose these material conditions clearly wherever you make the claim (e.g., checkout, sales page).</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-2">4) How to claim</h4>
                <p className="mb-3">Email info@aiessentials.us with subject &ldquo;Guarantee Refund Request&rdquo; within 10 days after the 60-day period, attaching:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>the approved Exhibit A, and</li>
                  <li>a dashboard/report showing results vs. target, and</li>
                  <li>a short note confirming you met the conditions above.</li>
                </ul>
                <p className="mt-3">We&apos;ll approve/deny within 10 business days and, if approved, refund to the original payment method within 5 business days.</p>
                <p className="mt-3"><strong>Processor fees:</strong> Card processors like Stripe typically do not return processing fees on refunds. Our default is to refund your full service fee and we absorb Stripe&apos;s fee, unless Exhibit A says otherwise.</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-2">5) Exclusions</h4>
                <ul className="list-disc list-inside space-y-2">
                  <li>Third-party spend (APIs, SaaS, ad spend) isn&apos;t refundable.</li>
                  <li>Force-majeure/platform outages aren&apos;t covered.</li>
                  <li>If Section 3 isn&apos;t met, the guarantee doesn&apos;t apply.</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-2">6) Informal resolution & governing law</h4>
                <p>We&apos;ll try to resolve issues informally within 14 days of written notice. Governing law: Wyoming, USA.</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
