import { Router } from 'express';
import MatcheController from '../controllers/MatcheController';
import MatcheService from '../services/MatcheService';
import validateToken from '../middlewares/ValidateToken';

const router = Router();
const matcheService = new MatcheService();
const matcheController = new MatcheController(matcheService);

router.get('/matches', matcheController.getAll);
router.post('/matches', validateToken, matcheController.create);

export default router;
