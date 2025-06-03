import { Router } from 'express';

const router = Router();

// GET /api/custom-sets
router.get('/', (req, res) => {
  res.json({ message: 'Get all custom sets' });
});

export default router; 