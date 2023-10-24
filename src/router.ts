import Router from 'express';

const UserController = require('./controllers/userController');
const HouseholdController = require('./controllers/householdController');

const router = Router();

//Testing route
router.get('/helloworld', UserController.HelloWorld);

// new user route
router.post('/users', UserController.NewUser);
router.get('/users', UserController.GetUser);

//edit user route
router.post('/users/UpdateUser', UserController.UpdateUser);

//login
router.post('/login', UserController.Login);

// household related
router.delete('/household/users', HouseholdController.RemoveUser);
router.post('/household/users', HouseholdController.NewHouseholdUser);
router.get('/household/users', HouseholdController.GetHouseholdUsers);

export default router;