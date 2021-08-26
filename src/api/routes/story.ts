import { Router, Request, Response, NextFunction } from 'express';
import verifyToken from '../middlewares/verifyToken';
import StoryService from '../../services/story';
import { celebrate, Joi } from 'celebrate';

const route = Router();

export default (app: Router) => {
  app.use('/story', route);

  route.post(
    '/create',
    celebrate({
      body: Joi.object({
        content: Joi.string().required(),
        coverPhoto: Joi.string(),
      }),
    }),
    verifyToken,
    async (req: any, res: Response, next: NextFunction) => {
      try {
        const { story } = await StoryService.createStory(req.body, req.credentials);
        return res.status(201).json({ story });
      } catch (e) {
        return next(e);
      }
    },
  );

  route.get('/all', verifyToken, async (req: any, res: Response, next: NextFunction) => {
    try {
      const { stories } = await StoryService.fetchStories();
      return res.status(201).json({ stories });
    } catch (e) {
      return next(e);
    }
  });
};
