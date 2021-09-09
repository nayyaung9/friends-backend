import { IMessage } from '../interfaces/IMessage';
import mongoose from 'mongoose';

const Message = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

Message.set('toJSON', {
  versionKey: false,
});

export default mongoose.model<IMessage & mongoose.Document>('Message', Message);
