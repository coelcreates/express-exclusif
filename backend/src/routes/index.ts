import { Router } from 'express';
import productsRoutes from './products';
import usersRoutes from './users';
import nailDesignsRoutes from './nailDesigns';
import customSetsRoutes from './customSets';
import ordersRoutes from './orders';
import subscriptionsRoutes from './subscriptions';

const router = Router();

// API version and health check
router.get('/', (req, res) => {
  res.json({
    name: 'Express Exclusif API',
    version: '1.0.0',
    status: 'healthy',
  });
});

// Routes
router.use('/products', productsRoutes);
router.use('/users', usersRoutes);
router.use('/nail-designs', nailDesignsRoutes);
router.use('/custom-sets', customSetsRoutes);
router.use('/orders', ordersRoutes);
router.use('/subscriptions', subscriptionsRoutes);

export default router; 