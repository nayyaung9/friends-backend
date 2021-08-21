export interface IUser {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  salt: string;
}

export interface IUserInputDTO {
  fullName: string;
  email: string;
  password: string;
}

export interface IUserResponse {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  salt: string;
}
