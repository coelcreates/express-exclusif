import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler';
import { Router } from 'express';

// Import routes if available, otherwise use placeholders
let apiRoutes: Router;
try {
  apiRoutes = require('./routes').default;
} catch (error) {
  console.warn('Routes not fully implemented, using placeholder');
  apiRoutes = Router();
  
  // Placeholder route
  apiRoutes.get('/', (req, res) => {
    res.json({ message: 'API routes not fully implemented yet' });
  });
}

// Load environment variables
dotenv.config();

// Create Express server
const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API routes
app.use('/api', apiRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Express Exclusif API',
    version: '1.0.0',
    status: 'online',
  });
});

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
  console.log(`🔗 http://localhost:${port}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app; 