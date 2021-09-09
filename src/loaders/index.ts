import expressLoader from './express';
import mongooseLoader from './mongoose';
import socketLoader from './socket';
import Logger from './logger';

export default async ({ expressApp }) => {
  await mongooseLoader();
  Logger.info('DB loaded and connected!');

  await expressLoader({ app: expressApp });
  Logger.info('Express loaded');

  await socketLoader({ app: expressApp });
  Logger.info('Socket is alive');
};
