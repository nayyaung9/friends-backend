import { IStory } from '@/interfaces/IStory';
import mongoose from 'mongoose';

const Story = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, 'Please enter a full name'],
      index: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    coverPhoto: {
      type: String,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IStory & mongoose.Document>('Story', Story);
