import express from 'express';
import { createTrip, getTrips, getMyTrips } from '../controllers/tripController.js';
import { verifyToken } from '../middlewares/auth.js';

const router = express.Router();

router.post('/', verifyToken, createTrip);
router.get('/', getTrips);
router.get('/me', verifyToken, getMyTrips);

export default router;
