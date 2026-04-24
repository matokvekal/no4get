import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePeopleStore } from '@/stores/index.ts';
import type { EventType } from '@/core/types/index.ts';
import './AddFriendPage.css';

const EVENT_TYPES: { value: EventType; label: string; emoji: string }[] = [
  { value: 'birthday', label: 'Birthday', emoji: '🎂' },
  { value: 'anniversary', label: 'Anniversary', emoji: '💑' },
  { value: 'wedding', label: 'Wedding', emoji: '💍' },
  { value: 'custom', label: 'Other', emoji: '🎉' },
];

export function AddFriendPage() {
  const navigate = useNavigate();
  const { addPerson, loading, error } = usePeopleStore();
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [eventType, setEventType] = useState<EventType>('birthday');
  const [customLabel, setCustomLabel] = useState('');

  const handleSave = async () => {
    if (!name || !birthdate) return;
    try {
      await addPerson({ name, birthdate, eventType, eventLabel: customLabel || undefined });
      navigate('/people');
    } catch { /* error shown */ }
  };

  return (
    <div className="add-friend page">
      <header className="add-friend__header flex items-center gap-md">
        <button className="btn btn-ghost" onClick={() => navigate(-1)}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="add-friend__title">Add a Friend</h1>
      </header>

      <div className="add-friend__body flex-col gap-lg">
        <div className="field">
          <label className="field__label">Full name</label>
          <input className="field__input" placeholder="Friend's name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="field">
          <label className="field__label">Date</label>
          <input className="field__input" type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
        </div>

        <div className="field">
          <label className="field__label">Occasion</label>
          <div className="add-friend__event-grid">
            {EVENT_TYPES.map((et) => (
              <button
                key={et.value}
                className={`add-friend__event-btn ${eventType === et.value ? 'add-friend__event-btn--active' : ''}`}
                onClick={() => setEventType(et.value)}
              >
                <span className="add-friend__event-emoji">{et.emoji}</span>
                <span>{et.label}</span>
              </button>
            ))}
          </div>
        </div>

        {eventType === 'custom' && (
          <div className="field">
            <label className="field__label">What's the occasion?</label>
            <input className="field__input" placeholder="e.g. Graduation" value={customLabel} onChange={(e) => setCustomLabel(e.target.value)} />
          </div>
        )}

        {error && <p style={{ color: 'var(--error)', fontSize: '0.85rem' }}>{error}</p>}

        <div className="flex gap-md" style={{ marginTop: 'auto', paddingBottom: 'var(--space-xl)' }}>
          <button className="btn btn-ghost flex-1" onClick={() => navigate(-1)}>Skip</button>
          <button className="btn btn-primary flex-1" disabled={loading || !name || !birthdate} onClick={handleSave}>
            {loading ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}
