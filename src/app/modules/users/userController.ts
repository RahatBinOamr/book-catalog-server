import { Request, Response } from 'express';
import { User } from './userModel';

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    console.log('user', savedUser);
    res.json(savedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const findUser = async (req: Request, res: Response) => {
  try {
    const email = req.params.email;
    const result = await User.findOne({ email });
    if (result?.email) {
      return res.json(result);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
