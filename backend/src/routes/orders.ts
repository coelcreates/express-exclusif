import { Router } from 'express';

const router = Router();

// GET /api/orders
router.get('/', (req, res) => {
  res.json({ message: 'Get all orders' });
});

export default router; 