// GET  /api/chat/init/:personId              → ChatMessage (welcome message)
// POST /api/chat              { personId, message, budget? } → ChatMessage
import type { Request, Response } from 'express';
import { ChatService } from '../services/ChatService';

const chatService = new ChatService();

export class ChatController {
  init = (req: Request, res: Response) => {
    const personId = String(req.params['personId']);
    res.json(chatService.initMessage(personId));
  };

  respond = (req: Request, res: Response) => {
    const { personId, message, budget } = req.body;
    if (!personId || !message) { res.status(400).json({ error: 'personId and message required' }); return; }
    const result = chatService.respond(personId, message, Number(budget) || 100);
    res.json(result);
  };
}
