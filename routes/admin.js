import express from 'express';
import {
  getDashboard,
  updateUserStatus,
  deleteTrip
} from '../controllers/adminController.js';
import { verifyToken } from '../middlewares/auth.js';
import { authorizeRoles } from '../middlewares/role.js';
import { body, param } from 'express-validator';
import { validateRequest } from '../middlewares/validator.js';

const router = express.Router();

// Middleware pour vérifier l'ID MongoDB
const validateMongoId = param('id')
  .isMongoId()
  .withMessage('ID invalide');

// Routes administrateur
router.get(
  '/dashboard',
  verifyToken,
  authorizeRoles('admin'),
  getDashboard
);

router.patch(
  '/user/:id/verify',
  [
    verifyToken,
    authorizeRoles('admin'),
    validateMongoId,
    body('status')
      .isIn(['en_attente', 'verifie', 'rejete'])
      .withMessage('Status invalide. Valeurs possibles: en_attente, verifie, rejete'),
    validateRequest
  ],
  updateUserStatus
);

router.delete(
  '/trip/:id',
  [
    verifyToken,
    authorizeRoles('admin'),
    validateMongoId,
    validateRequest
  ],
  deleteTrip
);

export default router;
