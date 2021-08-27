export interface IUser {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  salt: string;
  avatar: string;
}

export interface IUserInputDTO {
  fullName: string;
  email: string;
  password: string;
}

export interface IUserSocialInput {
  fullName: string;
  email: string;
  avatar: string;
}
