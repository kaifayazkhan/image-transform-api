import { Router } from 'express';
import authRoutes from './auth.routes.js';
import imageRoutes from './image.routes.js';
import userRoutes from './user.routes.js';

const router: Router = Router();

router.use('/auth', authRoutes);
router.use('/images', imageRoutes);
router.use('/user', userRoutes);

export default router;
