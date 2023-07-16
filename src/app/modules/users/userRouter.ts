import express from 'express';
import { createUser, findUser } from './userController';
const router = express.Router();
router.post('/', createUser);
router.get('/:email', findUser);
export default router;
