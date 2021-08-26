import { IUser } from './IUser';

export interface IStory {
  _id: string;
  content: string;
  user: IUser;
  createAt: string;
  updatedAt: string;
}

export interface IStoryInputDTO {
  content: string;
}
