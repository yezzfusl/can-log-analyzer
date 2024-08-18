export interface CANMessage {
  timestamp: number;
  id: number;
  dlc: number;
  data: number[];
}

export interface ParsedCANLog {
  messages: CANMessage[];
  uniqueIDs: number[];
}
