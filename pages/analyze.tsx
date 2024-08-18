import React, { useState } from 'react';
import Head from 'next/head';
import Layout from '../components/layout/Layout';
import FileUploader from '../components/can/FileUploader';
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

      <h1 className="text-3xl font-bold mb-4">Analyze CAN Log</h1>
      <FileUploader onFileUpload={handleFileUpload} />

      {parsedData && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-2">Analysis Results</h2>
          <p>Total messages: {parsedData.messages.length}</p>
          <p>Unique IDs: {parsedData.uniqueIDs.length}</p>
          {/* Add more analysis results here */}
        </div>
      )}
    </Layout>
  );
};

export default Analyze;
