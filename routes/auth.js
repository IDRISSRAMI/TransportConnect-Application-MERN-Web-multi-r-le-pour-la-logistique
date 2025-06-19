// auth.js - Version simplifiée pour identifier le problème
import express from 'express';
import { body, param } from 'express-validator';
import { validateRequest } from '../middlewares/validator.js';
import { verifyToken as protect } from '../middlewares/auth.js';

import {
  register,
  login,
  forgotPassword,
  resetPassword,
  getMe,
  updateDetails,
  updatePassword
} from '../controllers/authController.js';

const router = express.Router();

// Routes publiques
router.post('/register', register);
router.post('/login', login);
router.post('/forgotpassword', forgotPassword);

// Cette route pourrait causer le problème - testons sans validation d'abord
router.put('/resetpassword/:resettoken', resetPassword);

// Middleware pour les routes protégées
router.use(protect);

// Routes protégées
router.get('/me', getMe);
router.put('/updatedetails', updateDetails);
router.put('/updatepassword', updatePassword);

export default router;