import React from 'react';
import { motion } from 'framer-motion';

const Header = ({ currentSection = 0 }) => {
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

        </div>
      </div>
    </motion.header>
  );
};

export default Header;
