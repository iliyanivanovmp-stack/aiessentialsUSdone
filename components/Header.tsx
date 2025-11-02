'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide elements when scrolling down, show when scrolling up or at top
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current || currentScrollY <= 100) {
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
      
      // Close menu when scrolling
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const openBookingModal = () => {
    window.open('https://calendly.com/iliyan-ivanov-mp/discovery-call-with-aiessentials', '_blank');
  };

  const menuItems = [
    { name: 'Home', id: 'home' },
    { name: 'Services', id: 'services' },
    { name: 'Process', id: 'process' },
    { name: 'Case Studies', id: 'case-studies' },
    { name: 'ROI Calculator', id: 'roi-calculator' },
    { name: 'Pricing', id: 'pricing' },
    { name: 'FAQ', id: 'faq' },
    { name: 'Contact', id: 'contact' }
  ];

  const handleMenuItemClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* AIessentials Logo */}
      {isVisible && (
        <motion.div
          className="fixed top-2 left-2 md:-top-4 md:left-12 z-50 font-headline font-bold text-lg tracking-tight text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          whileHover={{ letterSpacing: '0.1em' }}
        >
          <img
            src="/Gemini_Generated_Image_hcb1jjhcb1jjhcb1-removebg-preview.png"
            alt="AIessentials"
            className="h-20 w-auto md:h-32"
          />
        </motion.div>
      )}
      
      {/* Book a Call Button */}
      {isVisible && (
        <motion.button
          onClick={openBookingModal}
          className="fixed top-6 right-20 z-50 bg-white text-black px-4 py-2 text-sm font-medium hover:bg-gray-100 transition-colors duration-200"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          BOOK A CALL
        </motion.button>
      )}
      
      {/* Burger Menu Button */}
      {isVisible && (
        <motion.button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="fixed top-6 right-6 z-50 w-10 h-10 flex items-center justify-center text-white hover:text-gray-300 transition-colors duration-200"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </motion.button>
      )}
      
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="fixed top-16 right-6 w-80 bg-black/95 backdrop-blur-md border border-gray-800 rounded-lg z-40"
        >
          <div className="px-6 py-6">
            <div className="flex flex-col space-y-4">
              {/* Menu Items */}
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleMenuItemClick(item.id)}
                  className="text-left text-white hover:text-cyan-400 text-sm uppercase tracking-wider font-medium transition-colors duration-200 py-2 focus:outline-none"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  whileHover={{ x: 4 }}
                >
                  {item.name}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Mobile sticky CTA */}
      <motion.div
        className="fixed bottom-6 right-6 z-50 md:hidden"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.4 }}
      >
        <motion.button
          onClick={openBookingModal}
          className="bg-white text-black px-6 py-3 rounded-full text-sm font-semibold shadow-2xl hover:shadow-cyan-400/25 transition-all duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          BOOK CALL
        </motion.button>
      </motion.div>
    </>
  );
};

export default Header;