import React from 'react';
import { ParsedCANLog } from '../../types/can';
import { analyzeCANTraffic, detectAnomalies } from '../../utils/canParser';

interface AdvancedAnalysisProps {
  data: ParsedCANLog;
}

const AdvancedAnalysis: React.FC<AdvancedAnalysisProps> = ({ data }) => {
  const idFrequency = analyzeCANTraffic(data);
  const anomalies = detectAnomalies(data);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Advanced Statistics</h3>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li>Total Duration: {data.statistics.duration.toFixed(2)} seconds</li>
          <li>Average Bitrate: {data.statistics.averageBitrate.toFixed(2)} Mbps</li>
          <li>Message Frequency: {data.statistics.messageFrequency.toFixed(2)} msgs/sec</li>
        </ul>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Top 5 Most Frequent IDs</h3>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          {Object.entries(idFrequency)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([id, freq]) => (
              <li key={id}>ID {id}: {freq} occurrences</li>
            ))}
        </ul>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Potential Anomalies</h3>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          {anomalies.map((id) => (
            <li key={id}>ID {id}: Unusual frequency detected</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdvancedAnalysis;
