import React, { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import FileUploader from '../components/can/FileUploader';
import CANVisualizer from '../components/can/CANVisualizer';
import AdvancedAnalysis from '../components/can/AdvancedAnalysis';
import { parseCANLog } from '../utils/canParser';
import { ParsedCANLog } from '../types/can';

const Analyze: React.FC = () => {
  const [parsedData, setParsedData] = useState<ParsedCANLog | null>(null);

  const handleFileUpload = (content: string) => {
    const parsed = parseCANLog(content);
    setParsedData(parsed);
  };

  return (
    <Layout>
      <Head>
        <title>Analyze CAN Log | CAN Log Analyzer</title>
      </Head>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-gray-800 dark:text-white"
      >
        <h1 className="text-3xl font-bold mb-4">Analyze CAN Log</h1>
        <div className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg glassmorphism">
          <h2 className="text-xl font-semibold mb-4">Supported File Types</h2>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
            <li>Standard CAN log (.log, .txt)</li>
            <li>Vector ASC files (.asc)</li>
            <li>PCAN-View trace files (.trc)</li>
            <li>Kvaser log files (.kva)</li>
          </ul>
        </div>
        <FileUploader onFileUpload={handleFileUpload} />
        {parsedData ? (
          <div className="mt-8 space-y-8">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow glassmorphism">
              <h2 className="text-2xl font-bold mb-2">Analysis Results</h2>
              <p className="text-gray-700 dark:text-gray-300">Total messages: {parsedData.messages.length}</p>
              <p className="text-gray-700 dark:text-gray-300">Unique IDs: {parsedData.uniqueIDs.length}</p>
              <p className="text-gray-700 dark:text-gray-300">Log duration: {parsedData.statistics.duration.toFixed(2)} seconds</p>
            </div>
            <CANVisualizer data={parsedData} />
            <AdvancedAnalysis data={parsedData} />
          </div>
        ) : (
          <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg glassmorphism">
            <h2 className="text-xl font-semibold mb-4">Analysis Features</h2>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
              <li>Message frequency analysis</li>
              <li>Timing and latency calculations</li>
              <li>Signal extraction and decoding</li>
              <li>Anomaly detection</li>
              <li>Advanced data visualization</li>
            </ul>
          </div>
        )}
      </motion.div>
    </Layout>
  );
};

export default Analyze;
