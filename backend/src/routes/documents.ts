import { Router } from 'express';
import * as documentController from '../controllers/documentController';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { uploadDocumentSchema } from '../validation/schemas';
import multer from 'multer';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.use(authenticate);
router.use(authorize(['recruiter']));
router.post('/', validate(uploadDocumentSchema), upload.single('file'), documentController.uploadDocument);
router.get('/:id', documentController.getDocument);
router.delete('/:id', documentController.deleteDocument);

export default router;
