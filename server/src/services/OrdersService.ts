import { db } from '../db/store';
import type { DbOrder } from '../db/store';

interface BasketItem { giftId: string; giftName: string; giftImage: string; price: number; personId: string; personName: string; }

export class OrdersService {
  getByUser(userId: string) {
    return db.orders.filter((o) => o.userId === userId);
  }

  getByUserPaginated(userId: string, page: number, limit: number) {
    const all = db.orders
      .filter((o) => o.userId === userId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const start = (page - 1) * limit;
    return { data: all.slice(start, start + limit), hasMore: start + limit < all.length, total: all.length };
  }

  checkout(userId: string, items: BasketItem[]) {
    const orders: DbOrder[] = items.map((item) => ({
      id: `o${Date.now()}_${item.giftId}`,
      userId,
      personId: item.personId,
      personName: item.personName,
      giftId: item.giftId,
      giftName: item.giftName,
      giftImage: item.giftImage,
      price: item.price,
      date: new Date().toISOString().split('T')[0],
      status: 'paid',
    }));
    db.orders.push(...orders);
    return orders;
  }
}
