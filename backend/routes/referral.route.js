import express from 'express';
import { createReferral, getReferrals } from '../controllers/referral.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/createReferral' , verifyToken , createReferral);
router.get('/getReferral' , getReferrals);

export default router;