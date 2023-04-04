// Package Imports
import express, { Express } from 'express';
import cors from 'cors';

// Route Imports
import categoryRoute from './routes/categoryRoute';

const app: Express = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/categories', categoryRoute);

export default app;
