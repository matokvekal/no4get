import type { Person } from '@/core/types/index.ts';
import { EventCard } from './EventCard.tsx';
import './UpcomingSection.css';

interface Props {
  people: Person[];
  onLoadMore: () => void;
  onCardClick: (id: string) => void;
}

export function UpcomingSection({ people, onLoadMore, onCardClick }: Props) {
  if (people.length === 0) return null;

  function handleScroll(e: React.UIEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    if (el.scrollLeft + el.clientWidth > el.scrollWidth * 0.7) {
      onLoadMore();
    }
  }

  return (
    <section>
      <div className="upcoming__header">
        <h4 className="upcoming__title">Upcoming Events</h4>
      </div>
      <div className="upcoming__carousel" onScroll={handleScroll}>
        {people.map((p) => (
          <EventCard key={p.id} person={p} onClick={() => onCardClick(p.id)} />
        ))}
      </div>
    </section>
  );
}
