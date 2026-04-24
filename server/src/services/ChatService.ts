import { db } from '../db/store';
import { GiftsService } from './GiftsService';

const giftsService = new GiftsService();

const replies = [
  "I love it! Here are some ideas based on that:",
  "Great taste! Let me curate something special:",
  "Perfect hint! I found these for you:",
  "Oh, that's so thoughtful! Check these out:",
  "Noted! Here's what I'd suggest:",
];

export class ChatService {
  initMessage(personId: string) {
    const person = db.people.find((p) => p.id === personId);
    const name = person?.name?.split(' ')[0] ?? 'them';
    const event = person?.eventLabel ?? person?.eventType ?? 'special day';
    return {
      id: `init_${personId}`,
      role: 'assistant' as const,
      content: `Hi! I'm beginning the profile for ${name}. To find a gift that truly resonates, let's start with the vibe. Is this for a milestone celebration, or more of a quiet, intimate gesture? Their ${event} is coming up — let's make it special! 🎁`,
      timestamp: new Date().toISOString(),
    };
  }

  respond(personId: string, message: string, budget: number) {
    const person = db.people.find((p) => p.id === personId);
    const name = person?.name?.split(' ')[0] ?? 'them';
    const idx = message.length % replies.length;
    const reply = `${replies[idx]} Based on "${message}", here are perfect gifts for ${name} under $${budget}!`;
    const gifts = giftsService.suggestFromChat(personId, message, budget);
    return { reply, gifts };
  }
}
