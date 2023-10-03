import Router from 'express';

import { helloWorld } from './controllers/userController';

const router = Router();

//Testing route
router.get('/helloworld', helloWorld);

export default router;