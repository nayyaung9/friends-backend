import jwt from 'jsonwebtoken';
import config from '@/config';
import argon2 from 'argon2';
import User from '@/models/user';
import { randomBytes } from 'crypto';
import { IUserResponse, IUserInputDTO } from '@/interfaces/IUser';
import Logger from '@/loaders/logger';

function generateToken(user: IUserResponse) {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      _id: user._id,
      exp: exp.getTime() / 1000,
    },
    config.jwtSecret,
  );
}

const SignUp = async (userInputDTO: IUserInputDTO) => {
  try {
    Logger.debug('Calling Sign-Up endpoint with body: %o', userInputDTO);

    const salt = randomBytes(32);

    const hashedPassword = await argon2.hash(userInputDTO.password, { salt });

    const userRecord = new User({
      ...userInputDTO,
      salt: salt.toString('hex'),
      password: hashedPassword,
    });

    Logger.info('Generating Token');
    const token = generateToken(userRecord);

    Logger.info('Saving user record to database.');
    await userRecord.save();

    if (!userRecord) {
      throw new Error('User cannot be created');
    }

    Logger.info('Return User and Token');
    return { user: userRecord, token };
  } catch (e) {
    throw e;
  }
};

export default {
  SignUp,
};
