import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout/Layout';

const Home: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>CAN Log Analyzer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to CAN Log Analyzer</h1>
        <p className="mb-8">Analyze and visualize your CAN log files with ease.</p>
        <Link href="/analyze" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Start Analyzing
        </Link>
      </div>
    </Layout>
  );
};

export default Home;
