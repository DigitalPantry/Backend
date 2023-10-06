import Router from 'express';

const UserController = require('./controllers/userController')

const router = Router();

//Testing route
router.get('/helloworld', UserController.HelloWorld);

// new user route
router.post('/users/new', UserController.NewUser);

export default router;