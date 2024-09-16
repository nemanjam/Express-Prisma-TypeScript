import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import authorRouter from './routes/author.router';
import bookRouter from './routes/book.router';
import authRouter from './routes/auth.router';
import profileRouter from './routes/profile.router';
import { notFoundHandler } from './middleware/not-found';
import { errorHandler } from './middleware/error-handler';
import cookieParser from 'cookie-parser';
import { NextFunction, Request, Response } from 'express';

dotenv.config();

const PORT: number = parseInt(process.env.PORT as string, 10);
const ORIGIN = process.env.ORIGIN as string;

const app = express();

// CORS Middleware
const corsOptions = {
  origin: ORIGIN,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
// JSON Middleware & Form Data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie parser middleware
app.use(cookieParser());

// Main Routes
app.use('/api/auth', authRouter);
app.use('/api/profile', profileRouter);
app.use('/api/authors', authorRouter);
app.use('/api/books', bookRouter);

// test
app.use('/', (request: Request, response: Response, next: NextFunction) => {
  return response.status(200).json({ success: true, data: 'fallback Hello world' });
});

// Not Found Middleware
app.use(notFoundHandler);

// Error Handling Middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on ORIGIN: ${ORIGIN}`);
});
