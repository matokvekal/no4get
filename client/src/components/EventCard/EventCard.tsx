import { formatDaysUntil } from '@/utils/dateUtils.ts';
import type { Person } from '@/core/types/index.ts';
import './EventCard.css';

interface Props {
  person: Person;
  onFindGift?: () => void;
  compact?: boolean;
}

export function EventCard({ person, onFindGift, compact = false }: Props) {
  return (
    <div className={`event-card ${compact ? 'event-card--compact' : ''}`}>
      <div className="event-card__avatar">
        <img src={person.avatar ?? `https://api.dicebear.com/9.x/avataaars/svg?seed=${person.id}`} alt={person.name} />
      </div>
      <div className="event-card__info">
        <p className="event-card__name">{person.name}</p>
        <p className="event-card__event">{person.eventType === 'birthday' ? '🎂' : '🎉'} {person.eventLabel ?? person.eventType}</p>
        <p className="event-card__date">{formatDaysUntil(person.daysUntil)}</p>
      </div>
      {!compact && onFindGift && (
        <button className="btn btn-primary event-card__btn" onClick={onFindGift}>
          Find Gift
        </button>
      )}
    </div>
  );
}
