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

/**
 * @route /api/story/update/:id
 * @method PUT
 * @description update story by id
 */
const updateStory = async (id, data): Promise<{ story: IStory }> => {
  try {
    const findStory = await Story.findById(id);

    if (!findStory) {
      throw 'Story not found or maybe deleted';
    }

    const updateStory = await Story.findByIdAndUpdate(
      id,
      {
        $set: {
          ...data,
        },
      },
      { new: true },
    ).populate('user', '-password -salt -email -createdAt -updatedAt');

    return { story: updateStory };
  } catch (error) {
    throw error;
  }
};

/**
 * @route /api/story/delete/:id
 * @method DELETE
 * @description delete story by id
 */
const deleteStory = async (id): Promise<{ story: IStory }> => {
  try {
    const findStory = await Story.findById(id);

    if (!findStory) {
      throw 'Story not found or maybe deleted';
    }

    const deletedStory = await Story.findByIdAndDelete(id);

    return { story: deletedStory };
  } catch (error) {
    throw error;
  }
};

export default {
  createStory,
  fetchStories,
  fetchStoryById,
  fetchMyStories,
  updateStory,
  deleteStory,
};
