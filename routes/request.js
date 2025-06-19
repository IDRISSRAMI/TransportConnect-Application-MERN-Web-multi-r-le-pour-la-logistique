import express from 'express';
import {
  createRequest,
  getRequestsForTrip,
  respondToRequest,
  getMyRequests
} from '../controllers/requestController.js';
import { verifyToken } from '../middlewares/auth.js';

const router = express.Router();

router.post('/', verifyToken, createRequest);
router.get('/me', verifyToken, getMyRequests);
router.get('/trip/:tripId', verifyToken, getRequestsForTrip);
router.patch('/:id', verifyToken, respondToRequest);

export default router;
