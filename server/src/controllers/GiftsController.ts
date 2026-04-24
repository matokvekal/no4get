// GET /api/gifts/suggest/:personId?budget=100  → Gift[]
import type { Request, Response } from 'express';
import { GiftsService } from '../services/GiftsService';

const giftsService = new GiftsService();

export class GiftsController {
  suggest = (req: Request, res: Response) => {
    const personId = String(req.params['personId']);
    const budget = parseInt(String(req.query['budget'] ?? 100), 10) || 100;
    const gifts = giftsService.suggest(personId, budget);
    res.json(gifts);
  };
}
