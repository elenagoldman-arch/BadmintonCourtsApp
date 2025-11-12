import { Player, CourtsResponse } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';
//const API_BASE_URL = '/api';

export const api = {
  async getPlayers(): Promise<Player[]> {
    const response = await fetch(`${API_BASE_URL}/players`);
    if (!response.ok) throw new Error('Failed to fetch players');
    return response.json();
  },

  async addPlayer(name: string): Promise<Player> {
    const response = await fetch(`${API_BASE_URL}/players`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) throw new Error('Failed to add player');
    return response.json();
  },

  async getCourts(): Promise<CourtsResponse> {
    const response = await fetch(`${API_BASE_URL}/courts`);
    if (!response.ok) throw new Error('Failed to fetch courts');
    return response.json();
  },

  async startMatch(): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/match/start`, {
      method: 'POST',
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to start match');
    }
  },

  async endMatch(courtId: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/match/end/${courtId}`, {
      method: 'POST',
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to end match');
    }
  },

  async closeCourt(courtId: number): Promise<void> {
    console.log('API: Closing court', courtId);
    const response = await fetch(`${API_BASE_URL}/match/close/${courtId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('API: Response status', response.status, response.statusText);
    if (!response.ok) {
      let errorMessage = 'Failed to close court';
      try {
        const contentType = response.headers.get('content-type');
        console.log('API: Content-Type', contentType);
        if (contentType && contentType.includes('application/json')) {
          const error = await response.json();
          console.log('API: Error response', error);
          errorMessage = error.message || errorMessage;
        } else {
          const text = await response.text();
          console.log('API: Error text', text);
          errorMessage = text || errorMessage;
        }
      } catch (e) {
        console.error('API: Error parsing response', e);
      }
      throw new Error(errorMessage);
    }
    console.log('API: Court closed successfully');
    // Success - no need to parse response body
  },
};

