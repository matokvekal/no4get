// POST /api/auth/login      { email, password } → { id, name, email, avatar, token }
// POST /api/auth/register   { name, email, password } → { id, name, email, avatar, token }
import type { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';

const authService = new AuthService();

export class AuthController {
  login = (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) { res.status(400).json({ error: 'Email and password required' }); return; }
      const user = authService.login(email, password);
      res.json(user);
    } catch (e) { res.status(401).json({ error: (e as Error).message }); }
  };

  register = (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) { res.status(400).json({ error: 'Name, email and password required' }); return; }
      const user = authService.register(name, email, password);
      res.status(201).json(user);
    } catch (e) { res.status(400).json({ error: (e as Error).message }); }
  };
}
