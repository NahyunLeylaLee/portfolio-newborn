import React from 'react';
import { motion } from 'framer-motion';

const FeatureHighlights = () => {
  const features = [
    {
      title: "History",
      icon: "📊",
      description: "Real-time survey tracking",
      color: "from-blue-400 to-blue-600"
    },
    {
      title: "Data Export",
      icon: "📋",
      description: "Health data export",
      color: "from-green-400 to-green-600"
    },
    {
      title: "Alarm",
      icon: "🔔",
      description: "Automated reminder system",
      color: "from-yellow-400 to-yellow-600"
    },
    {
      title: "Data",
      icon: "💾",
      description: "Manage user profiles",
      color: "from-purple-400 to-purple-600"
    },
    {
      title: "Records",
      icon: "📈",
      description: "Track survey responses",
      color: "from-pink-400 to-pink-600"
    },
    {
      title: "Message",
      icon: "💬",
      description: "Send surveys via text/email", // Send surveys via text or email
      color: "from-indigo-400 to-indigo-600"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section className="min-h-screen bg-page-bg flex items-center justify-center px-6 pt-16 pb-12 md:pt-20 md:pb-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-heading-dark mb-6">
            Feature Highlights
          </h2>
          <p className="text-lg text-body-text max-w-3xl mx-auto">
            Highlights survey tracking, data export, automated reminders, user management, response records, and mobile interface.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                y: -5,
                transition: { duration: 0.2 }
              }}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-brand-200 overflow-hidden">
                <div className="h-32 bg-gradient-to-br from-brand-200 to-brand-300 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className="text-4xl"
                  >
                    {feature.icon}
                  </motion.div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-heading-dark mb-2 group-hover:text-brand-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-body-text text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureHighlights;
