import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { GiftsController } from '../controllers/GiftsController';

const router = Router();
const ctrl = new GiftsController();

router.use(authMiddleware);
router.get('/suggest/:personId', ctrl.suggest);

export default router;
