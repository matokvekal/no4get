// GET  /api/people           → Person[]
// POST /api/people           { name, birthdate, eventType, eventLabel? } → Person
import type { Response } from 'express';
import type { AuthRequest } from '../middleware/auth';
import { PeopleService } from '../services/PeopleService';

const peopleService = new PeopleService();

export class PeopleController {
  getAll = (req: AuthRequest, res: Response) => {
    const people = peopleService.getByUser(req.userId!);
    res.json(people);
  };

  add = (req: AuthRequest, res: Response) => {
    try {
      const { name, birthdate, eventType, eventLabel, relation } = req.body;
      if (!name || !birthdate || !eventType) { res.status(400).json({ error: 'name, birthdate, eventType required' }); return; }
      const person = peopleService.add(req.userId!, { name, birthdate, eventType, eventLabel, relation });
      res.status(201).json(person);
    } catch (e) { res.status(400).json({ error: (e as Error).message }); }
  };

  update = (req: AuthRequest, res: Response) => {
    try {
      const person = peopleService.update(req.userId!, req.params.id, req.body);
      res.json(person);
    } catch (e) { res.status(404).json({ error: (e as Error).message }); }
  };

  delete = (req: AuthRequest, res: Response) => {
    try {
      peopleService.delete(req.userId!, req.params.id);
      res.status(204).end();
    } catch (e) { res.status(404).json({ error: (e as Error).message }); }
  };
}
