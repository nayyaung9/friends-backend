import jwt from 'jsonwebtoken';
import config from '../config';
import argon2 from 'argon2';
import User from '../models/user';
import MailService from './mailer';
import { randomBytes } from 'crypto';
import { IUser, IUserInputDTO, IUserSocialInput } from '../interfaces/IUser';
import Logger from '../loaders/logger';

function generateToken(user: IUser) {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
    },
    config.jwtSecret,
  );
}

const SignUp = async (userInputDTO: IUserInputDTO): Promise<{ token: string }> => {
  const { email } = userInputDTO;
  try {
    Logger.debug('Calling Sign-Up endpoint with body: %o', userInputDTO);

    const salt = randomBytes(32);

    const hashedPassword = await argon2.hash(userInputDTO.password, { salt });

    const findUser = await User.findOne({ email });

    if (findUser) {
      throw new Error('User Already existed');
    }
    const userRecord = new User({
      ...userInputDTO,
      salt: salt.toString('hex'),
      password: hashedPassword,
    });

    Logger.info('Generating Token');
    const token = generateToken(userRecord);

    Logger.info('Saving user record to database.');
    await userRecord.save();

    await MailService.sendWelcomeMail(userRecord.email);
    if (!userRecord) {
      throw new Error('User cannot be created');
    }

    Logger.info('Return User and Token');
    return { token };
  } catch (e) {
    throw e;
  }
};

const SignIn = async (email: string, password: string): Promise<{ token: string }> => {
  const findUser = await User.findOne({ email });
  if (!findUser) {
    throw new Error('User not registered');
  }
  Logger.info('Verify password');
  const validPassword = await argon2.verify(findUser.password, password);
  if (validPassword) {
    Logger.info('Password is valid!');
    Logger.info('Generating JWT');
    const token = generateToken(findUser);

    return { token };
  } else {
    throw new Error('Invalid Password');
  }
};

const SocialAuth = async (userInputDTO: IUserSocialInput): Promise<{ token: string }> => {
  const { email } = userInputDTO;
  try {
    Logger.debug('Calling Sign-Up endpoint with body: %o', userInputDTO);

    const salt = randomBytes(32);

    const hashedPassword = await argon2.hash('password', { salt });

    const findUser = await User.findOne({ email });

    if (findUser) {
      const token = generateToken(findUser);

      return { token };
    }
    const userRecord = new User({
      ...userInputDTO,
      salt: salt.toString('hex'),
      password: hashedPassword,
    });

    Logger.info('Generating Token');
    const token = generateToken(userRecord);

    Logger.info('Saving user record to database.');
    await userRecord.save();

    await MailService.sendWelcomeMail(userRecord.email);
    if (!userRecord) {
      throw new Error('User cannot be created');
    }

    Logger.info('Return User and Token');
    return { token };
  } catch (e) {
    throw e;
  }
};

export default {
  SignUp,
  SignIn,
  SocialAuth,
};
