import { Router } from 'express';
import TeamController from '../controllers/TeamController';
import TeamService from '../services/TeamService';

const router = Router();
const teamService = new TeamService();
const teamController = new TeamController(teamService);

router.get('/teams', teamController.getAll);
router.get('/teams/:id', teamController.getById);

export default router;
