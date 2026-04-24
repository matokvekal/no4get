import { db } from '../db/store';

export class GiftsService {
  suggest(personId: string, budget: number) {
    const person = db.people.find((p) => p.id === personId);
    // Filter gifts within budget and shuffle for variety
    let gifts = db.gifts.filter((g) => g.price <= budget);
    if (gifts.length === 0) gifts = db.gifts.slice(0, 4);
    // Shuffle deterministically based on personId for consistent demo
    const seed = personId.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    return [...gifts].sort((a, b) => (parseInt(a.id.slice(1)) + seed) % 7 - (parseInt(b.id.slice(1)) + seed) % 7).slice(0, 6);
  }

  suggestFromChat(personId: string, message: string, budget: number) {
    const keywords = message.toLowerCase();
    let gifts = db.gifts.filter((g) => g.price <= budget);
    if (keywords.includes('tech') || keywords.includes('gadget')) gifts = gifts.filter((g) => g.category === 'tech');
    else if (keywords.includes('cozy') || keywords.includes('relax') || keywords.includes('spa')) gifts = gifts.filter((g) => ['wellness', 'home'].includes(g.category));
    else if (keywords.includes('food') || keywords.includes('coffee') || keywords.includes('cook')) gifts = gifts.filter((g) => ['food', 'experiences'].includes(g.category));
    else if (keywords.includes('fit') || keywords.includes('sport') || keywords.includes('yoga')) gifts = gifts.filter((g) => g.category === 'fitness');
    if (gifts.length < 3) gifts = db.gifts.filter((g) => g.price <= budget).slice(0, 4);
    return gifts.slice(0, 6);
  }
}
