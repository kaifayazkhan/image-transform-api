import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import {
  uploadImage,
  transformImage,
} from '../controllers/image.controller.js';

const router: Router = Router();

router.route('/upload').post(verifyJWT, uploadImage);
router.route('/:id/transform').post(verifyJWT, transformImage);

export default router;
