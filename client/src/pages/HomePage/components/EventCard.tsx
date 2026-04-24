import type { Person } from '@/core/types/index.ts';
import './EventCard.css';

const THEMES: Record<string, { gradient: string; accent: string; accentMid: string }> = {
  birthday:    { gradient: 'linear-gradient(135deg,#fdf2f8,#fce7f3)', accent: '#831843', accentMid: 'rgba(157,23,77,0.65)' },
  anniversary: { gradient: 'linear-gradient(135deg,#ecfdf5,#d1fae5)', accent: '#064e3b', accentMid: 'rgba(6,95,70,0.65)' },
  wedding:     { gradient: 'linear-gradient(135deg,#f5f3ff,#ede9fe)', accent: '#4c1d95', accentMid: 'rgba(76,29,149,0.65)' },
  custom:      { gradient: 'linear-gradient(135deg,#eef2ff,#e0e7ff)', accent: '#312e81', accentMid: 'rgba(55,48,163,0.65)' },
};

interface Props {
  person: Person;
  onClick: () => void;
}

export function EventCard({ person, onClick }: Props) {
  const theme = THEMES[person.eventType] ?? THEMES.custom;
  const avatar = person.avatar ?? `https://api.dicebear.com/9.x/avataaars/svg?seed=${person.id}`;
  const daysLabel = person.daysUntil === 0 ? 'Today' : `In ${person.daysUntil} Days`;
  const typeLabel = person.eventLabel ?? person.eventType;
  const eventDate = new Date(person.nextEventDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

  return (
    <div className="ev-card" style={{ background: theme.gradient }} onClick={onClick}>
      <div className="ev-card__top">
        <div className="ev-card__avatar-wrap">
          <img className="ev-card__avatar" src={avatar} alt={person.name} />
        </div>
        <span className="ev-card__badge" style={{ color: theme.accent }}>{daysLabel}</span>
      </div>
      <div className="ev-card__body">
        <p className="ev-card__type" style={{ color: theme.accentMid }}>{typeLabel}</p>
        <h4 className="ev-card__name" style={{ color: theme.accent }}>{person.name}</h4>
        <p className="ev-card__detail" style={{ color: theme.accentMid }}>
          {person.relation ? `${person.relation} • ${eventDate}` : eventDate}
        </p>
      </div>
    </div>
  );
}
