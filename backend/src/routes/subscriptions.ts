import { Router } from 'express';

const router = Router();

// GET /api/subscriptions
router.get('/', (req, res) => {
  res.json({ message: 'Get all subscriptions' });
});

export default router; 