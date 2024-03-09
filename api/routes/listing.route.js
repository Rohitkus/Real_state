import express from 'express'
import { createListing } from '../controllers/lilsting.controller.js';
import { verifyToken } from '../Utils/varifyUser.js';
const router = express.Router()


router.post('/create',verifyToken,createListing)

export default router;
