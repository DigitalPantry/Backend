import Router from 'express';

const UserController = require('./controllers/userController');
const HouseholdController = require('./controllers/householdController');
const ItemController = require('./controllers/itemController');
const RecipeController = require('./controllers/recipeController');

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
router.post('/users/newMember', UserController.NewHHMember);

//item related
router.post('/items', ItemController.UpsertItem)
router.delete('/items', ItemController.RemoveItem)
router.get('/items', ItemController.GetHouseholdItems)

//recipe related
router.post('/recipes', RecipeController.UpsertRecipe)
router.delete('/recipes', RecipeController.RemoveRecipe)
router.get('/recipes', RecipeController.GetHouseholdRecipes)

export default router;