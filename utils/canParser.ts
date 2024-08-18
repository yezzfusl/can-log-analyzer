import { CANMessage, ParsedCANLog } from '../types/can';

export function parseCANLog(logContent: string): ParsedCANLog {
  const lines = logContent.split('\n');
  const messages: CANMessage[] = [];
  const uniqueIDs = new Set<number>();

  lines.forEach((line) => {
    const parts = line.trim().split(/\s+/);
    if (parts.length >= 4) {
      const timestamp = parseFloat(parts[0]);
      const id = parseInt(parts[2], 16);
      const dlc = parseInt(parts[3]);
      const data = parts.slice(4, 4 + dlc).map((hex) => parseInt(hex, 16));

      messages.push({ timestamp, id, dlc, data });
      uniqueIDs.add(id);
    }
  });

  return {
    messages,
    uniqueIDs: Array.from(uniqueIDs),
  };
}
