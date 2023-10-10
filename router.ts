import Router from 'express';

const UserController = require('./src/controllers/userController')

const router = Router();

//Testing route
router.get('/helloworld', UserController.HelloWorld);

//User Routes
router.post('/createUser', UserController.NewUser);
router.get('/getUserById', UserController.GetUser);

export default router;