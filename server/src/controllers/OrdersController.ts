// GET  /api/orders            → Order[]
// POST /api/orders/checkout   { items: { giftId, price }[] } → Order[]
import type { Response } from 'express';
import type { AuthRequest } from '../middleware/auth';
import { OrdersService } from '../services/OrdersService';

const ordersService = new OrdersService();

export class OrdersController {
  getAll = (req: AuthRequest, res: Response) => {
    if (req.query.page) {
      const page = Math.max(1, parseInt(String(req.query.page), 10));
      const limit = Math.max(1, parseInt(String(req.query.limit ?? '10'), 10));
      res.json(ordersService.getByUserPaginated(req.userId!, page, limit));
    } else {
      res.json(ordersService.getByUser(req.userId!));
    }
  };

  checkout = (req: AuthRequest, res: Response) => {
    try {
      const { items } = req.body;
      if (!items?.length) { res.status(400).json({ error: 'items required' }); return; }
      const orders = ordersService.checkout(req.userId!, items);
      res.status(201).json(orders);
    } catch (e) { res.status(400).json({ error: (e as Error).message }); }
  };
}
