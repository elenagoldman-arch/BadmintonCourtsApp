import { useState, useRef } from 'react';
import { api } from '../services/api';

interface AddPlayerFormProps {
  onPlayerAdded: () => void;
}

export default function AddPlayerForm({ onPlayerAdded }: AddPlayerFormProps) {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      await api.addPlayer(name.trim());
      setName('');
      onPlayerAdded();
      // Focus the input field after successful submission
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add player');
      // Focus the input field even on error so user can retry
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter player name"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
          autoFocus
        />
        <button
          type="submit"
          disabled={isLoading || !name.trim()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Adding...' : 'Add Player'}
        </button>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </form>
  );
}

