import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { PeopleController } from '../controllers/PeopleController';

const router = Router();
const ctrl = new PeopleController();

router.use(authMiddleware);
router.get('/', ctrl.getAll);
router.post('/', ctrl.add);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.delete);

export default router;
