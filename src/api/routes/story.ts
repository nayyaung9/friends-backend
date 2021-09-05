import { Router, Request, Response, NextFunction } from 'express';
import verifyToken from '../middlewares/verifyToken';
import StoryService from '../../services/story';
import { celebrate, Joi } from 'celebrate';
import Logger from '../../loaders/logger';

const route = Router();

export default (app: Router) => {
  app.use('/story', route);

  route.get('/my-stories', verifyToken, async (req: any, res: Response, next: NextFunction) => {
    try {
      const { stories } = await StoryService.fetchMyStories(req.credentials);
      return res.status(201).json({ stories });
    } catch (e) {
      return next(e);
    }
  });

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

  route.get('/:id', verifyToken, async (req: any, res: Response, next: NextFunction) => {
    const { id } = req.params as any;

    try {
      const { story } = await StoryService.fetchStoryById(id);
      return res.status(201).json({ story });
    } catch (e) {
      return next(e);
    }
  });

  route.put('/update/:id', verifyToken, async (req: any, res: Response, next: NextFunction) => {
    const { id } = req.params as any;

    try {
      const { story } = await StoryService.updateStory(id, req.body);
      return res.status(201).json({ story });
    } catch (e) {
      return next(e);
    }
  });

  route.delete('/delete/:id', verifyToken, async (req: any, res: Response, next: NextFunction) => {
    const { id } = req.params as any;

    try {
      const { story } = await StoryService.deleteStory(id);
      return res.status(201).json({ story });
    } catch (e) {
      return next(e);
    }
  });
};
