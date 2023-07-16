import { Schema, model } from 'mongoose';
import { IUser } from './userInterface';

const userSchema = new Schema({
  name: {
    type: 'string',
  },
  password: {
    type: 'string',
    required: true,
  },
  email: {
    type: 'string',
    required: true,
    unique: true,
  },
});
export const User = model<IUser>('user', userSchema);
