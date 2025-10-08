import React from 'react';
import { motion } from 'framer-motion';

const AdminExperience = () => {
  return (
    <section className="min-h-screen bg-page-bg flex items-center justify-center px-6 pt-40 pb-20 md:pt-20">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Dashboard screenshot */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="order-2 lg:order-1"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-brand-100">
            <div className="aspect-video rounded-xl overflow-hidden">
              <img 
                src="/images/newborn survey create.jpg" 
                alt="Admin Dashboard Screenshot showing survey creation interface"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Right side - Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="order-1 lg:order-2"
        >
          <div className="space-y-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl lg:text-5xl font-bold text-heading-dark leading-tight"
            >
              Admin Experience
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-body-text leading-relaxed"
            >
              Hospital administrators can create customized surveys to send to parents. 
              Try creating a survey with this simplified demo.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-brand-800 hover:bg-brand-900 text-white px-12 py-4 rounded-full font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Try Creating Survey
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AdminExperience;
