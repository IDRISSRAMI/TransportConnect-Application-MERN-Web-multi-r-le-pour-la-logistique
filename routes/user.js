import express from 'express';
import { updateUser, logout, getallUsers, createUser } from '../controllers/userController.js';
import { verifyToken, verifyAdmin } from '../middlewares/auth.js';

const router = express.Router();

router.post('/', createUser);
router.get('/', verifyToken, getallUsers);
router.put('/:id', verifyToken, updateUser); // Mise à jour par ID
router.post('/logout', verifyToken, logout);

export default router;