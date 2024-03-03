import express from 'express';
import { signup } from '../controllers/aut.controller.js';

const router=express.Router()

router.post("/signup",signup)
export default router; 