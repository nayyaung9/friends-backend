import { Router, Request, Response, NextFunction } from 'express';
import AuthService from '../../services/auth';
import { IUserInputDTO } from '../../interfaces/IUser';
import { celebrate, Joi } from 'celebrate';
import Logger from '../../loaders/logger';

const route = Router();

export default (app: Router) => {
  app.use('/auth', route);

  route.post(
    '/signup',
    celebrate({
      body: Joi.object({
        fullName: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { token } = await AuthService.SignUp(req.body as IUserInputDTO);
        return res.status(201).json({ token });
      } catch (e) {
        Logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.post(
    '/signin',
    celebrate({
      body: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      // logger.debug('Calling Sign-In endpoint with body: %o', req.body);
      try {
        const { email, password } = req.body;
        console.log('login', req.body);
        const { token } = await AuthService.SignIn(email, password);
        return res.json({ token }).status(200);
      } catch (e) {
        console.log('login error', e);

        return next(e);
      }
    },
  );
};
