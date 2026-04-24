import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { logger } from './middleware/logger';
import { errorHandler } from './middleware/errorHandler';

import authRoutes from './routes/auth.routes';
import peopleRoutes from './routes/people.routes';
import giftsRoutes from './routes/gifts.routes';
import chatRoutes from './routes/chat.routes';
import ordersRoutes from './routes/orders.routes';

dotenv.config();

const app = express();
app.use(cors({ origin: 'http://localhost:5000', credentials: true }));
app.use(express.json());
app.use(logger);

app.use('/api/auth', authRoutes);
app.use('/api/people', peopleRoutes);
app.use('/api/gifts', giftsRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/orders', ordersRoutes);

app.get('/api/health', (_req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Gift Vibes server running on http://localhost:${PORT}`));
