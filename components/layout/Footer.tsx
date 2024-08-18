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

  const heartVariants = {
    beat: {
      scale: [1, 1.2, 1],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-4 mt-8 transition-colors duration-300"
    >
      <div className="container mx-auto text-center">
        <p>&copy; {year} CAN Log Analyzer. All rights reserved.</p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-2"
        >
          <a href="mailto:contact.fayssal.chokri2006@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">
            Contact Us
          </a>
        </motion.div>
        <div className="mt-4 flex justify-center items-center">
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-red-500 mr-2"
            variants={heartVariants}
            animate="beat"
          >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </motion.svg>
          <p>Programmed by Fayssal Chokri</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
