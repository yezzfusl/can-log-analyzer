export interface CANMessage {
  timestamp: number;
  id: number;
  dlc: number;
  data: number[];
}

export interface CANStatistics {
  totalMessages: number;
  uniqueIDs: number;
  duration: number;
  averageBitrate: number;
  messageFrequency: number;
}

export interface ParsedCANLog {
  messages: CANMessage[];
  uniqueIDs: number[];
  statistics: CANStatistics;
}
