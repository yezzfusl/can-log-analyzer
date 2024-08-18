import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import FeatureCard from '../components/home/FeatureCard';
import { ChartPieIcon, CogIcon, BoltIcon } from '@heroicons/react/24/outline';

const Home: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>CAN Log Analyzer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">Welcome to CAN Log Analyzer</h1>
        <p className="mb-8 text-gray-600 dark:text-gray-300">Analyze and visualize your CAN log files with ease.</p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link href="/analyze" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
            Start Analyzing
          </Link>
        </motion.div>
      </motion.div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard
          title="Advanced Visualization"
          description="Interactive graphs and charts to help you understand your CAN log data."
          icon={<ChartPieIcon className="h-8 w-8" />}
        />
        <FeatureCard
          title="Powerful Analysis"
          description="Detect anomalies and gain insights with our advanced analysis tools."
          icon={<CogIcon className="h-8 w-8" />}
        />
        <FeatureCard
          title="Real-time Processing"
          description="Fast and efficient processing of large CAN log files."
          icon={<BoltIcon className="h-8 w-8" />}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-16 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg glassmorphism"
      >
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Technical Information</h2>
        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
          <li>Support for various CAN log file formats</li>
          <li>Advanced mathematical analysis of CAN traffic patterns</li>
          <li>Customizable visualizations for different data aspects</li>
          <li>Efficient handling of large datasets</li>
          <li>Dark mode support for comfortable viewing</li>
        </ul>
      </motion.div>
    </Layout>
  );
};

export default Home;
