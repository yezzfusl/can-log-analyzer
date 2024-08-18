import { CANMessage, ParsedCANLog, CANStatistics } from '../types/can';

export function parseCANLog(logContent: string): ParsedCANLog {
  const lines = logContent.split('\n');
  const messages: CANMessage[] = [];
  const uniqueIDs = new Set<number>();
  let totalBitrate = 0;
  let startTime = Infinity;
  let endTime = -Infinity;

  lines.forEach((line) => {
    const parts = line.trim().split(/\s+/);
    if (parts.length >= 4) {
      const timestamp = parseFloat(parts[0]);
      const id = parseInt(parts[2], 16);
      const dlc = parseInt(parts[3]);
      const data = parts.slice(4, 4 + dlc).map((hex) => parseInt(hex, 16));

      messages.push({ timestamp, id, dlc, data });
      uniqueIDs.add(id);
      totalBitrate += (dlc * 8 + 47) * 1000 / 1e6; // Assuming 1Mbps CAN bus speed
      startTime = Math.min(startTime, timestamp);
      endTime = Math.max(endTime, timestamp);
    }
  });

  const duration = endTime - startTime;
  const averageBitrate = totalBitrate / duration;

  const stats: CANStatistics = {
    totalMessages: messages.length,
    uniqueIDs: uniqueIDs.size,
    duration,
    averageBitrate,
    messageFrequency: messages.length / duration
  };

  return {
    messages,
    uniqueIDs: Array.from(uniqueIDs),
    statistics: stats
  };
}

export function analyzeCANTraffic(parsedData: ParsedCANLog): Record<number, number> {
  const idFrequency: Record<number, number> = {};
  parsedData.messages.forEach((msg) => {
    idFrequency[msg.id] = (idFrequency[msg.id] || 0) + 1;
  });
  return idFrequency;
}

export function detectAnomalies(parsedData: ParsedCANLog): number[] {
  const idFrequency = analyzeCANTraffic(parsedData);
  const averageFrequency = Object.values(idFrequency).reduce((a, b) => a + b, 0) / Object.keys(idFrequency).length;
  const threshold = averageFrequency * 2; // Adjust this multiplier as needed
  
  return Object.entries(idFrequency)
    .filter(([, freq]) => freq > threshold)
    .map(([id]) => parseInt(id));
}
