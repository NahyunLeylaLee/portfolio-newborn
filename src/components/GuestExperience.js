import React from 'react';
import { motion } from 'framer-motion';

const GuestExperience = () => {
  return (
    <div className="min-h-screen">
      {/* Guest Section */}
      <section className="bg-page-bg flex items-center justify-center px-6 pt-24 pb-12 md:pt-20 md:pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl lg:text-6xl font-bold text-heading-dark leading-tight"
            >
              NewbornTrack Demo
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl text-body-text max-w-3xl mx-auto leading-relaxed"
            >
              A newborn health-tracking platform used at Bundang CHA Hospital.<br />
              Experience the system from three perspectives: <strong>Guest</strong>, <strong>Patient</strong>, and <strong>Admin</strong>.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Guest Experience Section */}
      <section className="bg-page-bg flex items-center justify-center px-6 pt-12 pb-12 md:py-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Screenshot placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-brand-200">
              <div className="aspect-video rounded-xl overflow-hidden">
                <img
                  src="/portfolio-newborn/images/newborn track.png"
                  alt="NewbornTrack website screenshot showing header with logo, navigation menu, guest section with baby hand image, and recent news cards"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 space-y-6 text-center lg:text-left"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl lg:text-4xl font-bold text-heading-dark leading-tight"
            >
              Guest Experience
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-body-text leading-relaxed"
            >
              Guests can explore public information, research content, and hospital resources. 
              Visit the live site to see how parents and doctors interact with the system in real-world use.
              <br />* Available only in Korean.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-4"
            >
              <motion.a
                href="https://newborntrack.org/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-12 py-4 bg-brand-800 text-white font-semibold rounded-full shadow-lg hover:bg-brand-900 transition-colors"
              >
                Visit Live Site
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default GuestExperience;