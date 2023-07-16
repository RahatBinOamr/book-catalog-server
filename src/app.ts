import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';
import bookRouter from './app/modules/book catalog/bookRouter';
import userRouter from './app/modules/users/userRouter';

const app: Application = express();

app.use(
  cors({
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
export default app;
app.use('/api/v1/books', bookRouter);
app.use('/api/v1/users', userRouter);
