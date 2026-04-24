export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  token: string;
}

export type EventType = 'birthday' | 'anniversary' | 'wedding' | 'custom';

export interface Person {
  id: string;
  userId: string;
  name: string;
  birthdate: string;
  eventType: EventType;
  eventLabel?: string;
  avatar?: string;
  relation?: string;
  tags?: string[];
  nextEventDate: string;
  daysUntil: number;
}

export interface Gift {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating?: number;
  vibeTag?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface BasketItem {
  giftId: string;
  giftName: string;
  giftImage: string;
  price: number;
  personId: string;
  personName: string;
}

export interface Order {
  id: string;
  userId: string;
  personId: string;
  personName: string;
  personAvatar?: string;
  giftId: string;
  giftName: string;
  giftImage: string;
  price: number;
  date: string;
  status: 'pending' | 'paid' | 'delivered';
}
