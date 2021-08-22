import { Router } from 'express';
import auth from './routes/auth';
import user from './routes/user';
import story from './routes/story';

// guaranteed to get dependencies
export default () => {
  const app = Router();
  auth(app);
  user(app);
  story(app);

  return app;
};
