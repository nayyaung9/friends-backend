import { IUser } from './IUser';

export interface IStory {
  _id: string;
  content: string;
  user: IUser;
}

export interface IStoryInputDTO {
  content: string;
}
