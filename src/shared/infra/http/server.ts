/* eslint-disable no-console */
import express, { Response, Request, NextFunction } from 'express';

import cors from 'cors';
import routes from './routes';
import AppError from '../../errors/AppError';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log(err);

  return response.status(500).json({
    status: 'error',
    error: err,
    message: 'Internal server error',
  });
});

app.listen(3333, () => console.log('✔ Server started on port 3333!'));
