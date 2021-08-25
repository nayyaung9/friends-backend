import Story from '../models/story';
import Logger from '../loaders/logger';
import { IStoryInputDTO, IStory } from '../interfaces/IStory';

const createStory = async (storyInput: IStoryInputDTO, currentUser): Promise<{ story: IStory }> => {
  const { content } = storyInput;
  try {
    Logger.debug('Calling Story endpoint with body: %o', storyInput);

    const newStory = new Story({
      content,
      user: currentUser._id,
    });

    Logger.info('Saving story into database');
    await newStory.save();

    Logger.info('Return the recorded story');
    return { story: newStory };
  } catch (error) {
    throw error;
  }
};

export default {
  createStory,
};
