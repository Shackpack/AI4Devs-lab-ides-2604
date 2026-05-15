import { Router } from 'express';
import * as candidateController from '../controllers/candidateController';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validation';
import { createCandidateSchema, updateCandidateSchema } from '../validation/schemas';

const router = Router();

router.use(authenticate);
router.use(authorize(['recruiter']));
router.post('/', validate(createCandidateSchema), candidateController.createCandidate);
router.get('/:id', candidateController.getCandidate);
router.put('/:id', validate(updateCandidateSchema), candidateController.updateCandidate);
router.delete('/:id', candidateController.deleteCandidate);

export default router;
