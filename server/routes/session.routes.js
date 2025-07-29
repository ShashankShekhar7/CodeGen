// server/routes/session.routes.js
import express from 'express';
import {
  createNewSession,
  getUserSessions,
  updateSession,
} from '../controllers/session.controller.js';
import verifyToken from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/new', verifyToken, createNewSession);
router.get('/all', verifyToken, getUserSessions);
router.put('/:sessionId', verifyToken, updateSession);

export default router;
