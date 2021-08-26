import { Router, Request, Response, NextFunction } from 'express';
import verifyToken from '../middlewares/verifyToken';
const route = Router();

export default (app: Router) => {
  app.use('/users', route);

  route.get('/me', verifyToken, async (req: any, res: Response, next: NextFunction) => {
    res.status(200).json({ user: req.credentials });
  });
};
