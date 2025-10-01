import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import errorHandler from './middlewares/error.middleware.js';
import { requestMiddleware } from './middlewares/request.middleware.js';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: '32kb' }));
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  })
);

app.use(requestMiddleware);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'OK',
  });
});

app.use(errorHandler);

export default app;
