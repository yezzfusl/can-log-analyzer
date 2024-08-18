import React, { useState } from 'react';
import Head from 'next/head';
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

      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Analyze CAN Log</h1>
      <FileUploader onFileUpload={handleFileUpload} />

      {parsedData && (
        <div className="mt-8 space-y-8">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">Analysis Results</h2>
            <p className="text-gray-700 dark:text-gray-300">Total messages: {parsedData.messages.length}</p>
            <p className="text-gray-700 dark:text-gray-300">Unique IDs: {parsedData.uniqueIDs.length}</p>
          </div>
          <CANVisualizer data={parsedData} />
          <AdvancedAnalysis data={parsedData} />
        </div>
      )}
    </Layout>
  );
};

export default Analyze;
