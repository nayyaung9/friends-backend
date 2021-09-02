import { Router, Request, Response, NextFunction } from 'express';
import verifyToken from '../middlewares/verifyToken';
import UserService from '../../services/user';

const route = Router();

export default (app: Router) => {
  app.use('/users', route);

  /**
   * update user profile such as avatar, email
   */

  route.put('/profile/update', verifyToken, async (req: any, res: Response, next: NextFunction) => {
    try {
      const { profile } = await UserService.updateProfile(req.body, req.credentials);
      return res.status(201).json({ profile });
    } catch (e) {
      return next(e);
    }
  });
};
