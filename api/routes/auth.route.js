import express from 'express';
import {signin, signup ,google,signout} from '../controllers/aut.controller.js';

const router=express.Router()

router.post("/signup",signup)

router.post("/signin",signin)

router.post('/google',google)
router.get('/signout',signout)

export default router; 