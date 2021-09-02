import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import config from '../../config';

function verifyToken(req: Request | any, res: Response, next: NextFunction): Response {
  const token: string | string[] = req.headers['x-access-token'];
  if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, config.jwtSecret, function (err: any, decoded: any) {
    if (err) {
      return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
    }
    // if everything good, save to request for use in other routes
    const credentials = decodedCredentials(decoded);
    req['credentials'] = credentials;

    next();
  });
}

function decodedCredentials(decoded) {
  const { _id, fullName, email, avatar } = decoded;
  return {
    _id,
    fullName,
    email,
    avatar,
  };
}

export default verifyToken;
