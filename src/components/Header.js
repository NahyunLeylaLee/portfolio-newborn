import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ currentSection = 0 }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navItems = [
    { name: 'Guest', index: 0 },
    { name: 'Patient', index: 1 },
    { name: 'Admin', index: 2 },
    { name: 'Features', index: 3 },
    { name: 'Contact', index: 4 }
  ];

  const handleNavClick = (index) => {
    if (window.scrollToSection) {
      window.scrollToSection(index);
    }
    // Close mobile menu after clicking
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-page-bg/95 backdrop-blur-sm border-b border-brand-100"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.h1 
            className="text-2xl font-bold text-heading-dark cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => handleNavClick(0)}
          >
            NewbornTrack Demo
          </motion.h1>
          
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => handleNavClick(item.index)}
                className={`transition-colors duration-200 font-medium ${
                  currentSection === item.index 
                    ? 'text-brand-800 border-b-2 border-brand-800 pb-1' 
                    : 'text-body-text hover:text-brand-600'
                }`}
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.name}
              </motion.button>
            ))}
            
          </nav>

          {/* Mobile menu button */}
          <motion.button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-brand-100 transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-6 h-6 text-body-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>
        </div>

        {/* Mobile Navigation - Toggle menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 border-t border-brand-100 pt-4"
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    onClick={() => handleNavClick(item.index)}
                    className={`px-4 py-3 rounded-lg transition-colors duration-200 font-medium text-left ${
                      currentSection === item.index 
                        ? 'bg-brand-800 text-page-bg' 
                        : 'bg-brand-100 text-body-text hover:bg-brand-200'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.name}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
