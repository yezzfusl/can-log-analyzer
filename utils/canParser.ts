// utils/canParser.ts
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

export function calculateBurstEvents(parsedData: ParsedCANLog, burstThreshold: number = 10): Array<{start: number, end: number, count: number}> {
  const bursts = [];
  let burstStart = 0;
  let burstEnd = 0;
  let burstCount = 0;

  for (let i = 1; i < parsedData.messages.length; i++) {
    const timeDiff = parsedData.messages[i].timestamp - parsedData.messages[i-1].timestamp;
    if (timeDiff < burstThreshold) {
      if (burstCount === 0) {
        burstStart = parsedData.messages[i-1].timestamp;
      }
      burstCount++;
      burstEnd = parsedData.messages[i].timestamp;
    } else if (burstCount > 0) {
      bursts.push({ start: burstStart, end: burstEnd, count: burstCount + 1 });
      burstCount = 0;
    }
  }

  if (burstCount > 0) {
    bursts.push({ start: burstStart, end: burstEnd, count: burstCount + 1 });
  }

  return bursts;
}

export function extractSignals(data: ParsedCANLog, signalDefinitions: Record<number, Array<{name: string, startBit: number, length: number, factor: number, offset: number}>>) {
  const extractedSignals: Record<string, Record<string, number[]>> = {};

  for (const message of data.messages) {
    const id = message.id;
    if (id in signalDefinitions) {
      if (!(id in extractedSignals)) {
        extractedSignals[id] = {};
      }

      for (const signal of signalDefinitions[id]) {
        if (!(signal.name in extractedSignals[id])) {
          extractedSignals[id][signal.name] = [];
        }

        const rawValue = extractRawValue(message.data, signal.startBit, signal.length);
        const physicalValue = rawValue * signal.factor + signal.offset;
        extractedSignals[id][signal.name].push(physicalValue);
      }
    }
  }

  return extractedSignals;
}

function extractRawValue(data: number[], startBit: number, length: number): number {
  let value = 0;
  for (let i = 0; i < length; i++) {
    const byteIndex = Math.floor((startBit + i) / 8);
    const bitIndex = (startBit + i) % 8;
    if (byteIndex < data.length) {
      value |= ((data[byteIndex] >> bitIndex) & 1) << i;
    }
  }
  return value;
}
