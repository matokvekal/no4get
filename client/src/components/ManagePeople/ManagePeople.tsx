import { useState } from 'react';
import { useUIStore, usePeopleStore } from '@/stores/index.ts';
import type { Person, EventType } from '@/core/types/index.ts';
import './ManagePeople.css';

const EVENT_TYPES: { value: EventType; label: string }[] = [
  { value: 'birthday', label: 'Birthday' },
  { value: 'anniversary', label: 'Anniversary' },
  { value: 'wedding', label: 'Wedding' },
  { value: 'custom', label: 'Other' },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

type EditState = { name: string; birthdate: string; eventType: EventType; eventLabel: string; relation: string };

function PersonRow({ person }: { person: Person }) {
  const { updatePerson, deletePerson } = usePeopleStore();
  const [expanded, setExpanded] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<EditState>({
    name: person.name,
    birthdate: person.birthdate,
    eventType: person.eventType,
    eventLabel: person.eventLabel ?? '',
    relation: person.relation ?? '',
  });

  const avatar = person.avatar ?? `https://api.dicebear.com/9.x/avataaars/svg?seed=${person.id}`;

  const handleSave = async () => {
    setSaving(true);
    try {
      await updatePerson(person.id, {
        name: form.name,
        birthdate: form.birthdate,
        eventType: form.eventType,
        eventLabel: form.eventLabel || undefined,
        relation: form.relation || undefined,
      });
      setExpanded(false);
    } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    setSaving(true);
    try { await deletePerson(person.id); }
    finally { setSaving(false); }
  };

  return (
    <div className={`mp-row${expanded ? ' mp-row--expanded' : ''}`}>
      <div className="mp-row__summary">
        <div className="mp-row__avatar">
          <img src={avatar} alt={person.name} />
        </div>
        <div className="mp-row__info">
          <span className="mp-row__name">{person.name}</span>
          <span className="mp-row__meta">{person.relation ?? 'Contact'} · {formatDate(person.nextEventDate)}</span>
        </div>
        <div className="mp-row__actions">
          <button className="mp-icon-btn" onClick={() => { setExpanded((v) => !v); setConfirmDelete(false); }}>
            <span className="material-symbols-outlined">{expanded ? 'expand_less' : 'edit'}</span>
          </button>
          {!confirmDelete
            ? <button className="mp-icon-btn mp-icon-btn--danger" onClick={() => setConfirmDelete(true)}>
                <span className="material-symbols-outlined">delete</span>
              </button>
            : <button className="mp-icon-btn mp-icon-btn--danger" onClick={handleDelete} disabled={saving}>
                <span className="material-symbols-outlined">check</span>
              </button>
          }
        </div>
      </div>

      {expanded && (
        <div className="mp-row__edit">
          <div className="mp-field">
            <label>Name</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="mp-field">
            <label>Relation</label>
            <input placeholder="e.g. Friend, Sister…" value={form.relation} onChange={(e) => setForm({ ...form, relation: e.target.value })} />
          </div>
          <div className="mp-field">
            <label>Date</label>
            <input type="date" value={form.birthdate} onChange={(e) => setForm({ ...form, birthdate: e.target.value })} />
          </div>
          <div className="mp-field">
            <label>Occasion</label>
            <div className="mp-event-row">
              {EVENT_TYPES.map((et) => (
                <button
                  key={et.value}
                  className={`mp-event-btn${form.eventType === et.value ? ' mp-event-btn--active' : ''}`}
                  onClick={() => setForm({ ...form, eventType: et.value })}
                >{et.label}</button>
              ))}
            </div>
          </div>
          {form.eventType === 'custom' && (
            <div className="mp-field">
              <label>Custom occasion</label>
              <input placeholder="e.g. Graduation" value={form.eventLabel} onChange={(e) => setForm({ ...form, eventLabel: e.target.value })} />
            </div>
          )}
          <button className="mp-save-btn" onClick={handleSave} disabled={saving || !form.name || !form.birthdate}>
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      )}
    </div>
  );
}

function AddPersonForm({ onDone }: { onDone: () => void }) {
  const { addPerson } = usePeopleStore();
  const [form, setForm] = useState<EditState>({ name: '', birthdate: '', eventType: 'birthday', eventLabel: '', relation: '' });
  const [saving, setSaving] = useState(false);

  const pickFromContacts = async () => {
    const nav = navigator as Navigator & { contacts?: { select: (props: string[], opts: object) => Promise<{ name?: string[] }[]> } };
    if (!nav.contacts) return;
    try {
      const results = await nav.contacts.select(['name'], { multiple: false });
      if (results[0]?.name?.[0]) setForm((f) => ({ ...f, name: results[0].name![0] }));
    } catch { /* user cancelled */ }
  };

  const handleAdd = async () => {
    setSaving(true);
    try {
      await addPerson({
        name: form.name,
        birthdate: form.birthdate,
        eventType: form.eventType,
        eventLabel: form.eventLabel || undefined,
        relation: form.relation || undefined,
      });
      onDone();
    } finally { setSaving(false); }
  };

  const contactsSupported = typeof (navigator as any).contacts !== 'undefined';

  return (
    <div className="mp-add-form">
      <p className="mp-add-form__title">Add Person</p>

      {contactsSupported && (
        <button className="mp-picker-btn" onClick={pickFromContacts}>
          <span className="material-symbols-outlined">contacts</span>
          Pick from Contacts
        </button>
      )}

      <div className="mp-field">
        <label>Name</label>
        <input placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      </div>
      <div className="mp-field">
        <label>Relation</label>
        <input placeholder="e.g. Friend, Colleague…" value={form.relation} onChange={(e) => setForm({ ...form, relation: e.target.value })} />
      </div>
      <div className="mp-field">
        <label>Date</label>
        <input type="date" value={form.birthdate} onChange={(e) => setForm({ ...form, birthdate: e.target.value })} />
      </div>
      <div className="mp-field">
        <label>Occasion</label>
        <div className="mp-event-row">
          {EVENT_TYPES.map((et) => (
            <button
              key={et.value}
              className={`mp-event-btn${form.eventType === et.value ? ' mp-event-btn--active' : ''}`}
              onClick={() => setForm({ ...form, eventType: et.value })}
            >{et.label}</button>
          ))}
        </div>
      </div>
      {form.eventType === 'custom' && (
        <div className="mp-field">
          <label>Custom occasion</label>
          <input placeholder="e.g. Graduation" value={form.eventLabel} onChange={(e) => setForm({ ...form, eventLabel: e.target.value })} />
        </div>
      )}
      <button className="mp-save-btn" onClick={handleAdd} disabled={saving || !form.name || !form.birthdate}>
        {saving ? 'Adding…' : 'Add to Circle'}
      </button>
    </div>
  );
}

export function ManagePeople() {
  const { showManagePeople, closeManagePeople } = useUIStore();
  const { people } = usePeopleStore();
  const [showAdd, setShowAdd] = useState(false);

  if (!showManagePeople) return null;

  return (
    <>
      <div className="mp-backdrop" onClick={closeManagePeople} />
      <div className="mp-sheet">
        <div className="mp-sheet__handle" />

        <div className="mp-sheet__header">
          <div>
            <span className="label-caps">Circle</span>
            <h2 className="mp-sheet__title">Manage People</h2>
          </div>
          <button className="mp-icon-btn" onClick={closeManagePeople}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="mp-sheet__body">
          {people.map((p) => <PersonRow key={p.id} person={p} />)}

          {showAdd
            ? <AddPersonForm onDone={() => setShowAdd(false)} />
            : (
              <button className="mp-add-btn" onClick={() => setShowAdd(true)}>
                <span className="material-symbols-outlined">person_add</span>
                Add Person
              </button>
            )
          }
        </div>
      </div>
    </>
  );
}
