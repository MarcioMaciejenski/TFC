import { Router } from 'express';
import LeaderBoardController from '../controllers/LeaderBoardController';
import LeaderBoardService from '../services/LeaderBoardService';

const router = Router();
const leaderBoardService = new LeaderBoardService();
const leaderBoardController = new LeaderBoardController(leaderBoardService);

router.get('/leaderboard/home', leaderBoardController.getAllHomeTeams);
router.get('/leaderboard/away', leaderBoardController.getAllAwayTeams);

export default router;
