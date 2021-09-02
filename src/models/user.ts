import { IUser } from '../interfaces/IUser';
import mongoose from 'mongoose';

const User = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Please enter a full name'],
      index: true,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
    },
    avatar: {
      type: String,
    },
    bio: {
      type: String,
    },
    password: String,
    salt: String,
  },
  { timestamps: true },
);

User.set('toJSON', {
  versionKey: false,
});

export default mongoose.model<IUser & mongoose.Document>('User', User);
