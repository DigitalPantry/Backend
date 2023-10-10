import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import router from './router';
import cors from 'cors';
import { initdb } from './util/database';
dotenv.config();
const api: Express = express();
const port = process.env.PORT || 8081;

initdb()
  .then(() => {
    api.use(express.json());

    api.use(cors());
    
    api.use('/api', router);
    
    api.get('/healthcheck', (req: Request, res: Response) => {
      res.statusCode = 200;
      res.send({ status: 'success' });
    });
    
    api.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  });