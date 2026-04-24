import { useNavigate } from 'react-router-dom';
import { formatDaysUntil } from '@/utils/dateUtils.ts';
import type { Person, Order } from '@/core/types/index.ts';
import './PriorityBento.css';

interface Props {
  person: Person;
  lastGift: Order | null;
}

export function PriorityBento({ person, lastGift }: Props) {
  const navigate = useNavigate();
  const typeLabel = person.eventLabel ?? person.eventType;
  const eventDate = new Date(person.nextEventDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

  return (
    <section className="bento">
      <div className="bento__main">
        <div>
          <div className="bento__badge">
            <span className="bento__pulse" />
            <span className="bento__badge-text">Priority reminder</span>
          </div>
          <h3 className="bento__name">{person.name}'s {typeLabel}</h3>
          <p className="bento__date">{formatDaysUntil(person.daysUntil)} — {eventDate}</p>
        </div>
        <button className="bento__btn" onClick={() => navigate(`/gifts/${person.id}`)}>
          Find Gift <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>

      <div className="bento__history">
        <div className="bento__history-icon">
          <span className="material-symbols-outlined">history</span>
        </div>
        <div>
          <p className="bento__history-label">Last Year</p>
          <p className="bento__history-gift">{lastGift ? lastGift.giftName : '—'}</p>
        </div>
      </div>
    </section>
  );
}
