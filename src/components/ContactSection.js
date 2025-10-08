import React from 'react';
import { motion } from 'framer-motion';

const ContactSection = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-brand-700 to-brand-900 flex items-center justify-center px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl lg:text-6xl font-bold text-white leading-tight"
          >
            Want to know more?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-brand-100 max-w-2xl mx-auto leading-relaxed"
          >
            For demo access, collaboration, or inquiries, contact Nahyun Lee.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pt-8"
          >
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                y: -2,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-page-bg text-brand-800 px-12 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Contact
            </motion.button>
          </motion.div>

          {/* Contact info cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6 mt-16"
          >
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-page-bg/10 backdrop-blur-sm rounded-xl p-6 border border-brand-300/20"
            >
              <div className="w-12 h-12 bg-brand-300/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-page-bg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-page-bg font-semibold mb-2">Email</h3>
              <p className="text-brand-100 text-sm">nahyun.lee@example.com</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-page-bg/10 backdrop-blur-sm rounded-xl p-6 border border-brand-300/20"
            >
              <div className="w-12 h-12 bg-brand-300/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-page-bg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-page-bg font-semibold mb-2">Location</h3>
              <p className="text-brand-100 text-sm">Bundang CHA Hospital</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-page-bg/10 backdrop-blur-sm rounded-xl p-6 border border-brand-300/20"
            >
              <div className="w-12 h-12 bg-brand-300/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-page-bg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-page-bg font-semibold mb-2">Response Time</h3>
              <p className="text-brand-100 text-sm">Within 24 hours</p>
            </motion.div>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="pt-16 border-t border-brand-300/20"
          >
            <p className="text-brand-200 text-sm">
              © 2025 NewbornTrack Interactive Demo. All Rights Reserved.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
