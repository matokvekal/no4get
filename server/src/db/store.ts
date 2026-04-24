import { seed } from './seed';

export type EventType = 'birthday' | 'anniversary' | 'wedding' | 'custom';

export interface DbUser { id: string; name: string; email: string; password: string; avatar?: string; }
export interface DbPerson { id: string; userId: string; name: string; birthdate: string; eventType: EventType; eventLabel?: string; avatar?: string; relation?: string; }
export interface DbGift { id: string; name: string; price: number; image: string; description: string; category: string; vibeTag?: string; rating?: number; }
export interface DbOrder { id: string; userId: string; personId: string; personName: string; personAvatar?: string; giftId: string; giftName: string; giftImage: string; price: number; date: string; status: string; }

export const db = {
  users: [...seed.users] as DbUser[],
  people: [...seed.people] as DbPerson[],
  gifts: [...seed.gifts] as DbGift[],
  orders: [...seed.orders] as DbOrder[],
};
