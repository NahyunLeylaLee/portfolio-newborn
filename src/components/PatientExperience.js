import React from 'react';
import { motion } from 'framer-motion';

const PatientExperience = () => {
  return (
    <section className="min-h-screen bg-brand-50 flex items-center justify-center px-6 py-20">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl lg:text-5xl font-bold text-heading-dark leading-tight"
          >
            Patient Experience
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-body-text leading-relaxed"
          >
            Patients (parents) receive health surveys from doctors and submit updates about their newborn's condition. 
            Try filling out a sample survey to experience the process.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-brand-800 hover:bg-brand-900 text-page-bg px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Try Sample Survey
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right side - Survey preview */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-brand-100 rounded-2xl p-8 border border-brand-200"
        >
          <div className="bg-page-bg rounded-xl shadow-lg p-6">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="flex items-center space-x-3"
              >
                <div className="w-3 h-3 bg-brand-600 rounded-full"></div>
                <h3 className="font-semibold text-heading-dark">Patient Sample Survey Preview</h3>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="space-y-3"
              >
                <div className="bg-brand-50 rounded-lg p-4">
                  <label className="block text-sm font-medium text-body-text mb-2">
                    How is your baby's feeding schedule?
                  </label>
                  <select className="w-full p-3 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent">
                    <option>Regular</option>
                    <option>Irregular</option>
                    <option>Having difficulties</option>
                  </select>
                </div>
                
                <div className="bg-brand-50 rounded-lg p-4">
                  <label className="block text-sm font-medium text-body-text mb-2">
                    Sleep pattern
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g., 3-4 hours at night"
                    className="w-full p-3 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  />
                </div>
                
                <div className="bg-brand-50 rounded-lg p-4">
                  <label className="block text-sm font-medium text-body-text mb-2">
                    Any concerns?
                  </label>
                  <textarea 
                    placeholder="Describe any concerns or observations..."
                    className="w-full p-3 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent h-20"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PatientExperience;
