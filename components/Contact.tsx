'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    newsletter: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to Calendly
    window.open('https://calendly.com/iliyan-ivanov-mp/discovery-call-with-aiessentials?month=2025-11', '_blank');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const openBookingModal = () => {
    window.open('https://calendly.com/iliyan-ivanov-mp/discovery-call-with-aiessentials?month=2025-11', '_blank');
  };

  const openROIModal = () => {
    window.open('https://calendly.com/iliyan-ivanov-mp/discovery-call-with-aiessentials?month=2025-11', '_blank');
  };

  return (
    <>
      {/* Final CTA Section */}
      <section className="py-24 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative">

          {/* Glass Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-12 md:p-16 relative z-10 overflow-hidden"
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-no-repeat opacity-[0.30] pointer-events-none"
              style={{
                backgroundImage: 'url(/WireframeRocket_BG_1A1A1A.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center calc(50% + 40px)',
                filter: 'blur(0.5px)'
              }}
            />

            {/* Lens Flare Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-3xl"
              animate={{
                x: ['-100%', '200%'],
                opacity: [0, 0.3, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 9,
                ease: "easeInOut"
              }}
            />

            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.95 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="font-headline font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6"
            >
              Ready to cut cost or create revenue with AI?
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.85 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-gray-300 text-xl md:text-2xl leading-relaxed mb-12 max-w-3xl mx-auto"
            >
              Show us your business. We'll show you the automations that boost it.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <motion.button
                onClick={openBookingModal}
                className="bg-white text-black px-10 py-5 text-sm uppercase tracking-wider font-semibold hover:bg-gray-200 transition-all duration-200 relative overflow-hidden group"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 0 40px rgba(0, 255, 255, 0.4)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-purple-500/10 to-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                />
                <span className="relative z-10">BOOK STRATEGY CALL</span>
              </motion.button>
              
              <motion.button
                onClick={openROIModal}
                className="border border-gray-600 text-white px-10 py-5 text-sm uppercase tracking-wider font-semibold hover:border-white hover:bg-white hover:text-black transition-all duration-200 relative group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-purple-500/5 to-yellow-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                />
                <span className="relative z-10">GET FREE AI ROI MAP</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-24 px-6 md:px-12" style={{ backgroundColor: '#1A1A1A' }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-headline font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6">
              Book a <span className="gradient-text">FREE Strategy Call</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Show us your bottleneck. We'll map the automation that removes it.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <div className="border border-gray-800 rounded-2xl p-8" style={{ backgroundColor: '#0D0D0D' }}>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full border border-gray-700 rounded-lg px-4 py-3 focus:border-white focus:outline-none transition-colors"
                        style={{ backgroundColor: '#0A0A0A' }}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full border border-gray-700 rounded-lg px-4 py-3 focus:border-white focus:outline-none transition-colors"
                        style={{ backgroundColor: '#0A0A0A' }}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full border border-gray-700 rounded-lg px-4 py-3 focus:border-white focus:outline-none transition-colors"
                      style={{ backgroundColor: '#0A0A0A' }}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full border border-gray-700 rounded-lg px-4 py-3 focus:border-white focus:outline-none transition-colors resize-none"
                      style={{ backgroundColor: '#0A0A0A' }}
                      placeholder="Tell us about your business and your vision..."
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-white text-black py-4 text-sm uppercase tracking-wider font-semibold hover:bg-gray-200 transition-colors duration-200"
                  >
                    BOOK CALL
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;