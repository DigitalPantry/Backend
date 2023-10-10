import Router from 'express';

const UserController = require('./controllers/userController')

const router = Router();

//Testing route
router.get('/helloworld', UserController.HelloWorld);

// new user route
router.post('/users', UserController.NewUser);
router.get('/users', UserController.GetUser)

export default router;