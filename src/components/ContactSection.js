import React from 'react';
import { motion } from 'framer-motion';

const ContactSection = () => {
  return (
    <section className="min-h-screen bg-page-bg flex flex-col items-center justify-between px-6 pt-16 pb-12 md:pt-20 md:pb-20">
      <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto text-center space-y-16">
        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-heading-dark leading-tight">
            Want to know more?
          </h2>
        </motion.div>

        {/* Contact button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
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
            className="inline-block bg-brand-800 hover:bg-brand-900 text-white px-14 py-5 rounded-full font-semibold text-xl transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Contact me!
          </motion.a>
        </motion.div>
      </div>

      {/* Footer - at the bottom center */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="w-full mt-12"
      >
        <div className="flex items-center justify-center space-x-3">
          <div className="w-8 h-8 flex-shrink-0 bg-brand-800 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">NL</span>
          </div>
          <div>
            <p className="text-sm text-body-text">
              Copyright © 2025 NewbornTrack. All Rights Reserved.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
