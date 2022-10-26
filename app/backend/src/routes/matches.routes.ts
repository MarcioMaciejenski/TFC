import { Router } from 'express';
import MatcheController from '../controllers/MatcheController';
import MatcheService from '../services/MatcheService';
import validateToken from '../middlewares/ValidateToken';
import validateTeams from '../middlewares/ValidateTeams';

const router = Router();
const matcheService = new MatcheService();
const matcheController = new MatcheController(matcheService);

router.get('/matches', matcheController.getAll);
router.post('/matches', validateToken, validateTeams, matcheController.create);
router.patch('/matches/:id/finish', validateToken, matcheController.update);

export default router;
