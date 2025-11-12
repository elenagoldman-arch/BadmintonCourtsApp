export interface Player {
  id: number;
  name: string;
  status: 'Waiting' | 'Playing' | number | string;
}

export interface Court {
  id: number;
  players: Player[];
  isActive: boolean;
}

export interface CourtsResponse {
  courts: Court[];
  waitingPlayerCount: number;
}

