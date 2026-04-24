import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { ChatController } from '../controllers/ChatController';

const router = Router();
const ctrl = new ChatController();

router.use(authMiddleware);
router.get('/init/:personId', ctrl.init);
router.post('/', ctrl.respond);

export default router;
