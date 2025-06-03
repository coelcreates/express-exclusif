import { Router } from 'express';

const router = Router();

// GET /api/nail-designs
router.get('/', (req, res) => {
  res.json({ message: 'Get all nail designs' });
});

export default router; 