import { IStory } from '../interfaces/IStory';
import mongoose from 'mongoose';

const Story = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    coverPhoto: {
      type: String,
    },
  },
  { timestamps: true },
);

Story.set('toJSON', {
  versionKey: false,
});

export default mongoose.model<IStory & mongoose.Document>('Story', Story);
