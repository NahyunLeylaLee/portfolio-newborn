import React from 'react';
import { motion } from 'framer-motion';

const ContactSection = () => {
  return (
    <section className="min-h-screen bg-white flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left side - Main heading */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-heading-dark leading-tight">
            Want to know more?{' '}
              <span className="text-body-text">For additional information, collaboration, or inquiries, <br/>contact Nahyun Lee.</span>
            </h2>
          </motion.div>

          {/* Right side - Secondary text and button */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <p className="text-lg text-body-text leading-relaxed">
                Contact Nahyun Lee today to discuss building various healthcare-related software or websites.
              </p>
            </div>
            
            <motion.a
              href="https://www.linkedin.com/in/lee-nahyun/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ 
                scale: 1.05, 
                y: -2,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-brand-800 hover:bg-brand-900 text-white px-12 py-4 rounded-full font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Contact me!
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 pt-8 border-t border-brand-200"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            {/* Logo and Copyright */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-brand-800 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">NL</span>
              </div>
              <div>
                <p className="text-sm text-body-text">
                  Copyright © 2025 NewbornTrack. All Rights Reserved.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
