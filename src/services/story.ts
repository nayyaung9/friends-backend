import Story from '../models/story';
import Logger from '../loaders/logger';
import { IStoryInputDTO, IStory } from '../interfaces/IStory';

/**
 * @route /api/story/create
 * @method POST
 * @description create a new story
 */
const createStory = async (storyInput: IStoryInputDTO, currentUser): Promise<{ story: IStory }> => {
  const { content } = storyInput;
  try {
    Logger.debug('Calling Story endpoint with body: %o', storyInput);

    const newStory = new Story({
      content: JSON.stringify(content),
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

/**
 * @route /api/story/all
 * @method GET
 * @description fetch the stories by 5 each atime
 */
const fetchStories = async (): Promise<{ stories: IStory[] }> => {
  try {
    const stories = await Story.find().sort({ createdAt: -1 }).populate('user');

    return { stories };
  } catch (error) {
    throw error;
  }
};

/**
 * @route /api/story/:id
 * @method GET
 * @description fetch story detail by id
 */
const fetchStoryById = async (id): Promise<{ story: IStory }> => {
  try {
    const story = await Story.findById(id).populate('user', '-password -salt -email -createdAt -updatedAt');

    return { story };
  } catch (error) {
    throw error;
  }
};

/**
 * @route /api/story/my-stories
 * @method GET
 * @description fetch my stories
 */
const fetchMyStories = async (currentUser): Promise<{ stories: IStory[] }> => {
  try {
    const stories = await Story.find()
      .sort({ createdAt: -1 })
      .populate('user', '-password -salt -email -createdAt -updatedAt');

    return { stories };
  } catch (error) {
    throw error;
  }
};

export default {
  createStory,
  fetchStories,
  fetchStoryById,
  fetchMyStories,
};
