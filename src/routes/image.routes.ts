import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import {
  uploadImage,
  transformImage,
  getTransformedImageById,
  getUserTransformedImages,
} from '../controllers/image.controller.js';

const router: Router = Router();

router.route('/').get(verifyJWT, getUserTransformedImages);
router.route('/:id').get(verifyJWT, getTransformedImageById);
router.route('/upload').post(verifyJWT, uploadImage);
router.route('/:id/transform').post(verifyJWT, transformImage);

export default router;
