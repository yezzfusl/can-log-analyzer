import React from 'react';
import { ParsedCANLog } from '../../types/can';

interface AdvancedAnalysisProps {
  data: ParsedCANLog;
}

interface SignalDefinition {
  name: string;
  startBit: number;
  length: number;
  factor: number;
  offset: number;
}

interface SignalDefinitions {
  [key: number]: SignalDefinition[];
}

interface ExtractedSignals {
  [key: string]: {
    [key: string]: number[];
  };
}

interface SignalAnalysisResult {
  avg: number;
  min: number;
  max: number;
}

interface AnalysisResults {
  [key: string]: SignalAnalysisResult;
}

const AdvancedAnalysis: React.FC<AdvancedAnalysisProps> = ({ data }) => {
  const analyzeCANTraffic = (data: ParsedCANLog): { [key: string]: number } => {
    const idFrequency: { [key: string]: number } = {};
    data.messages.forEach((msg) => {
      const id = msg.id.toString();
      idFrequency[id] = (idFrequency[id] || 0) + 1;
    });
    return idFrequency;
  };

  const detectAnomalies = (data: ParsedCANLog): number[] => {
    // Implement anomaly detection logic here
    return [];
  };

  const calculateBurstEvents = (data: ParsedCANLog): { start: number; end: number; count: number }[] => {
    // Implement burst event calculation logic here
    return [];
  };

  const extractSignals = (data: ParsedCANLog, signalDefinitions: SignalDefinitions): ExtractedSignals => {
    const extractedSignals: ExtractedSignals = {};

    data.messages.forEach((message) => {
      const id = message.id.toString();
      if (signalDefinitions[message.id]) {
        if (!extractedSignals[id]) {
          extractedSignals[id] = {};
        }
        signalDefinitions[message.id].forEach((signal) => {
          if (!extractedSignals[id][signal.name]) {
            extractedSignals[id][signal.name] = [];
          }
          const value = extractSignalValue(message.data, signal);
          extractedSignals[id][signal.name].push(value);
        });
      }
    });

    return extractedSignals;
  };

  const extractSignalValue = (data: number[], signal: SignalDefinition): number => {
    let value = 0;
    const startByte = Math.floor(signal.startBit / 8);
    const startBitInByte = signal.startBit % 8;
    const endByte = Math.floor((signal.startBit + signal.length - 1) / 8);
    
    for (let i = startByte; i <= endByte; i++) {
      const numBitsFromByte = Math.min(8 - (i === startByte ? startBitInByte : 0), signal.length - (i - startByte) * 8);
      const mask = (1 << numBitsFromByte) - 1;
      const shift = i === endByte ? 0 : 8 - numBitsFromByte;
      value = (value << numBitsFromByte) | ((data[i] >> shift) & mask);
    }

    return value * signal.factor + signal.offset;
  };

  const idFrequency = analyzeCANTraffic(data);
  const anomalies = detectAnomalies(data);
  const burstEvents = calculateBurstEvents(data);

  const avgMessageSize = data.messages.reduce((sum, msg) => sum + msg.dlc, 0) / data.messages.length;
  const dataRate = (data.messages.reduce((sum, msg) => sum + msg.dlc, 0) * 8) / data.statistics.duration / 1000; // kbps

  const signalDefinitions: SignalDefinitions = {
    0x100: [
      { name: 'EngineRPM', startBit: 0, length: 16, factor: 0.1, offset: 0 },
      { name: 'VehicleSpeed', startBit: 16, length: 8, factor: 1, offset: 0 },
    ],
    0x200: [
      { name: 'ThrottlePosition', startBit: 0, length: 8, factor: 0.5, offset: 0 },
      { name: 'BrakePosition', startBit: 8, length: 8, factor: 0.5, offset: 0 },
    ],
  };

  const extractedSignals = extractSignals(data, signalDefinitions);

  const analyzeSignal = (signalName: string, values: number[]): SignalAnalysisResult => {
    const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
    const min = Math.min(...values);
    const max = Math.max(...values);
    return { avg, min, max };
  };

  const signalAnalysis = Object.entries(extractedSignals).map(([id, signals]) => {
    const analysisResults: AnalysisResults = {};
    for (const [signalName, values] of Object.entries(signals)) {
      analysisResults[signalName] = analyzeSignal(signalName, values);
    }
    return { id, results: analysisResults };
  });

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Advanced Statistics</h3>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li>Total Duration: {data.statistics.duration.toFixed(2)} seconds</li>
          <li>Average Bitrate: {data.statistics.averageBitrate.toFixed(2)} Mbps</li>
          <li>Message Frequency: {data.statistics.messageFrequency.toFixed(2)} msgs/sec</li>
          <li>Average Message Size: {avgMessageSize.toFixed(2)} bytes</li>
          <li>Data Rate: {dataRate.toFixed(2)} kbps</li>
        </ul>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Top 5 Most Frequent IDs</h3>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          {Object.entries(idFrequency)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([id, freq]) => (
              <li key={id}>ID 0x{parseInt(id).toString(16).toUpperCase().padStart(3, '0')}: {freq} occurrences</li>
            ))}
        </ul>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Potential Anomalies</h3>
        {anomalies.length > 0 ? (
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            {anomalies.map((id) => (
              <li key={id}>ID 0x{id.toString(16).toUpperCase().padStart(3, '0')}: Unusual frequency detected</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700 dark:text-gray-300">No anomalies detected</p>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Burst Analysis</h3>
        <p className="mb-2 text-gray-700 dark:text-gray-300">Total burst events: {burstEvents.length}</p>
        {burstEvents.length > 0 ? (
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            {burstEvents.slice(0, 5).map((burst, index) => (
              <li key={index}>
                Burst {index + 1}: {burst.count} messages from {burst.start.toFixed(3)}s to {burst.end.toFixed(3)}s
              </li>
            ))}
            {burstEvents.length > 5 && (
              <li>... and {burstEvents.length - 5} more burst events</li>
            )}
          </ul>
        ) : (
          <p className="text-gray-700 dark:text-gray-300">No burst events detected</p>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Signal Analysis</h3>
        {signalAnalysis.length > 0 ? (
          <div className="space-y-4">
            {signalAnalysis.map(({ id, results }) => (
              <div key={id} className="border-t pt-4 first:border-t-0 first:pt-0">
                <h4 className="text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">
                  ID: 0x{parseInt(id).toString(16).toUpperCase().padStart(3, '0')}
                </h4>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  {Object.entries(results).map(([signalName, analysis]) => (
                    <li key={signalName}>
                      {signalName}:
                      <ul className="ml-4 list-disc">
                        <li>Average: {analysis.avg.toFixed(2)}</li>
                        <li>Minimum: {analysis.min.toFixed(2)}</li>
                        <li>Maximum: {analysis.max.toFixed(2)}</li>
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-700 dark:text-gray-300">No signals extracted. Please define signal definitions for your CAN network.</p>
        )}
      </div>
    </div>
  );
};

export default AdvancedAnalysis;
