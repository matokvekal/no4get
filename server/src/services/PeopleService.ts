import { db } from '../db/store';
import type { DbPerson, EventType } from '../db/store';

function daysUntilNext(birthdate: string): number {
  const today = new Date();
  const [, month, day] = birthdate.split('-').map(Number);
  const next = new Date(today.getFullYear(), month - 1, day);
  if (next < today) next.setFullYear(today.getFullYear() + 1);
  return Math.ceil((next.getTime() - today.getTime()) / 86_400_000);
}

function withNextEvent(p: DbPerson) {
  const days = daysUntilNext(p.birthdate);
  const today = new Date();
  const [, month, day] = p.birthdate.split('-').map(Number);
  const next = new Date(today.getFullYear(), month - 1, day);
  if (next < today) next.setFullYear(today.getFullYear() + 1);
  return { ...p, nextEventDate: next.toISOString().split('T')[0], daysUntil: days };
}

export class PeopleService {
  getByUser(userId: string) {
    return db.people.filter((p) => p.userId === userId).map(withNextEvent);
  }

  add(userId: string, data: { name: string; birthdate: string; eventType: EventType; eventLabel?: string; relation?: string }) {
    const person: DbPerson = {
      id: `p${Date.now()}`,
      userId,
      name: data.name,
      birthdate: data.birthdate,
      eventType: data.eventType,
      eventLabel: data.eventLabel,
      relation: data.relation,
      avatar: `https://api.dicebear.com/9.x/avataaars/svg?seed=${Date.now()}`,
    };
    db.people.push(person);
    return withNextEvent(person);
  }

  update(userId: string, personId: string, data: Partial<{ name: string; birthdate: string; eventType: EventType; eventLabel: string; relation: string }>) {
    const idx = db.people.findIndex((p) => p.id === personId && p.userId === userId);
    if (idx === -1) throw new Error('Person not found');
    db.people[idx] = { ...db.people[idx], ...data };
    return withNextEvent(db.people[idx]);
  }

  delete(userId: string, personId: string) {
    const idx = db.people.findIndex((p) => p.id === personId && p.userId === userId);
    if (idx === -1) throw new Error('Person not found');
    db.people.splice(idx, 1);
  }
}
