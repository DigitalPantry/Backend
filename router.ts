import Router from 'express';

const UserController = require('./controllers/userController')

const router = Router();

//Testing route
router.get('/helloworld', UserController.helloWorld);

export default router;