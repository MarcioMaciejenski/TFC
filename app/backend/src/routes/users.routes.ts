import { Router } from 'express';
import validateLogin from '../middlewares/validateLogin';
import UserController from '../controllers/UserController';
import UserService from '../services/UserService';

const router = Router();
const userService = new UserService();
const userController = new UserController(userService);

router.post('/login', validateLogin, userController.login);
router.get('/login/validate', userController.verifyLogin);

export default router;
