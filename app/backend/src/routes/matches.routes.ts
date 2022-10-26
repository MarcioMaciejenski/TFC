import { Router } from 'express';
import MatcheController from '../controllers/MatcheController';
import MatcheService from '../services/MatcheService';

const router = Router();
const matcheService = new MatcheService();
const matcheController = new MatcheController(matcheService);

router.get('/matches', matcheController.getAll);

export default router;
