import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8081;

app.get('/healthcheck', (req: Request, res: Response) => {
  res.statusCode = 200;
  res.send({ status: 'success' });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});