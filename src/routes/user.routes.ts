import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { getUser } from '../controllers/user.controller.js';

const router: Router = Router();

router.route('/').get(verifyJWT, getUser);

export default router;
