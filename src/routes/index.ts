import { Router } from 'express';
import authRoutes from './auth.routes.js';
import imageRoutes from './image.routes.js';

const router: Router = Router();

router.use('/auth', authRoutes);
router.use('/images', imageRoutes);

export default router;
