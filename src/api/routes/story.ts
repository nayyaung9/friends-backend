import { Router, Request, Response, NextFunction } from 'express';
import verifyToken from '../middlewares/verifyToken';
import StoryService from '@/services/story';
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
      console.log(req.credentials);
      try {
        // const { user } = await StoryService.createStory(req.body as IUserInputDTO);
        // return res.status(201).json({ user, token });
      } catch (e) {
        return next(e);
      }
    },
  );
};
