import { Court } from '../types';
import CourtCard from './CourtCard';

interface CourtListProps {
  courts: Court[];
  onMatchEnded: () => void;
}

export default function CourtList({ courts, onMatchEnded }: CourtListProps) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Courts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courts.map((court) => (
          <CourtCard
            key={court.id}
            court={court}
            onMatchEnded={onMatchEnded}
          />
        ))}
      </div>
    </div>
  );
}

