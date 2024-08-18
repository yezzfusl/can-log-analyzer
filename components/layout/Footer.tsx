import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const interval = setInterval(() => {
      setYear(new Date().getFullYear());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-4 mt-8 glassmorphism"
    >
      <div className="container mx-auto text-center">
        <p>&copy; {year} CAN Log Analyzer. All rights reserved.</p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-2"
        >
          <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
            Contact Us
          </a>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
