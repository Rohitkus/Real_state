import express from 'express'
import { createListing  ,deleteListing} from '../controllers/lilsting.controller.js';
import { verifyToken } from '../Utils/varifyUser.js';
const router = express.Router()


router.post('/create',verifyToken,createListing)
router.delete('/delete/:id', verifyToken, deleteListing);

export default router;
