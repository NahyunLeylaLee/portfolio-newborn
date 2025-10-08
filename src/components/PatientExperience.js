import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PatientExperience = () => {
  return (
    <section className="min-h-screen bg-page-bg flex items-center justify-center px-6 pt-16 pb-12 md:pt-20 md:pb-20">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-6 text-center lg:text-left"
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
            <Link to="/sample-survey">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-brand-800 hover:bg-brand-900 text-white px-12 py-4 rounded-full font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Try Sample Survey
              </motion.button>
            </Link>
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
                    What is your name? <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Your answer"
                    className="w-full p-3 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  />
                </div>

                <div className="bg-brand-50 rounded-lg p-4">
                  <label className="block text-sm font-medium text-body-text mb-2">
                    What is your gender? <span className="text-red-600">*</span>
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center cursor-pointer p-2 hover:bg-white rounded">
                      <input
                        type="radio"
                        name="gender"
                        className="w-4 h-4 mr-3 accent-brand-800"
                      />
                      <span className="text-body-text">Male</span>
                    </label>
                    <label className="flex items-center cursor-pointer p-2 hover:bg-white rounded">
                      <input
                        type="radio"
                        name="gender"
                        className="w-4 h-4 mr-3 accent-brand-800"
                      />
                      <span className="text-body-text">Female</span>
                    </label>
                  </div>
                </div>

                <div className="bg-brand-50 rounded-lg p-4">
                  <label className="block text-sm font-medium text-body-text mb-2">
                    Any additional comments?
                  </label>
                  <textarea
                    placeholder="Your answer"
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
