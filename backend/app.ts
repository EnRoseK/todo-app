// Package Imports
import express, { Express } from 'express';
import cors from 'cors';

// Route Imports
import categoryRoute from './routes/categoryRoute';
import taskRoute from './routes/taskRoute';

const app: Express = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/categories', categoryRoute);
app.use('/api/tasks', taskRoute);

export default app;
