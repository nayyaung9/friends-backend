import { IUser } from './IUser';

export interface IMessage {
  _id: string;
  message: string;
  sender: IUser;
  receiver: IUser;
  createAt: string;
  updatedAt: string;
}

export interface IMessageInputDTO {
  content: string;
}
