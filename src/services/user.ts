import User from '../models/user';
import Logger from '../loaders/logger';
import { IUserInputDTO, IUser } from '../interfaces/IUser';

/**
 * @param data IUserInputDTO
 * @param currentUser IUser
 * @returns the updated user info
 */
const updateProfile = async (data: IUserInputDTO, currentUser: IUser): Promise<{ profile: IUser }> => {
  try {
    const findUser = await User.findById(currentUser?._id);

    if (!findUser) {
      throw 'User not found';
    }

    const updateProfile = await User.findOneAndUpdate(
      {
        _id: currentUser?._id,
      },
      {
        $set: data,
      },
      { new: true },
    );

    Logger.info('updaing user info...');

    return { profile: updateProfile };
  } catch (error) {
    throw error;
  }
};

export default {
  updateProfile,
};
