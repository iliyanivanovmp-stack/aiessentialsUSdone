'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const ServicePageHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMenuOpen]);

  const menuItems = [
    { label: 'Home', id: 'home', isExternal: true },
    { label: 'What You Get', id: 'what-you-get' },
    { label: 'Why This Works', id: 'why-this-works' },
    { label: 'How It Works', id: 'how-it-works' },
    { label: 'Who This Is For', id: 'who-this-is-for' },
    { label: 'FAQ', id: 'faq' },
    { label: 'Book a Call', id: 'booking-form' },
  ];

  const handleMenuClick = (item: typeof menuItems[0]) => {
    if (item.isExternal) {
      window.location.href = 'https://aiessentials.us/';
    } else {
      document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const openCalendly = () => {
    window.open('https://calendly.com/iliyan-ivanov-mp/discovery-call-with-aiessentials', '_blank');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="w-full px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Image
              src="/Gemini_Generated_Image_hcb1jjhcb1jjhcb1-removebg-preview.png"
              alt="AI Essentials Logo"
              width={180}
              height={60}
              className="h-16 w-auto"
              priority
            />
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#e5e5e5' }}
              whileTap={{ scale: 0.95 }}
              onClick={openCalendly}
              className="bg-white text-black font-bold px-5 py-1.5 transition-colors uppercase text-xs tracking-wide"
            >
              BOOK A CALL
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2"
              aria-label="Menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute top-20 right-0 w-64 bg-black/95 backdrop-blur-md border-l border-b border-gray-800"
        >
          <nav className="py-4">
            {menuItems.map((item, index) => (
              <motion.button
                key={index}
                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleMenuClick(item)}
                className="w-full text-left px-6 py-3 text-white transition-colors text-sm font-medium"
              >
                {item.label}
              </motion.button>
            ))}
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default ServicePageHeader;
