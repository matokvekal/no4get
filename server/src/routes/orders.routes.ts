import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { OrdersController } from '../controllers/OrdersController';

const router = Router();
const ctrl = new OrdersController();

router.use(authMiddleware);
router.get('/', ctrl.getAll);
router.post('/checkout', ctrl.checkout);

export default router;
