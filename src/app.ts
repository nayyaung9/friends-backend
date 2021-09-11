import http from 'http';
import config from './config';

import express from 'express';

import Logger from './loaders/logger';

import socketLoader from './loaders/socket';

async function startServer() {
  const app = express();
  const server = http.createServer(app); //Create server with express

  await require('./loaders').default({ expressApp: app });

  await socketLoader({ server });

  server
    .listen(config.port, () => {
      Logger.info(`
        Friends Server listening on port: ${config.port} 🛡️
    `);
    })
    .on('error', err => {
      Logger.error(err);
      process.exit(1);
    });
}

startServer();
