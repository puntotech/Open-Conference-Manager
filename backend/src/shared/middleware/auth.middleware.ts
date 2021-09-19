import * as jwt from 'jsonwebtoken';

import {
  Inject,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { Connection } from 'typeorm';
import { DB_CONNECTION_TOKEN } from '../config/database.tokens.constants';
import { Speaker } from '@modules/speaker/speaker.entity';

export interface AuthMiddlewareRequest extends Request {
  user: any;
  token: string;
}
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @Inject(DB_CONNECTION_TOKEN) private readonly connection: Connection,
  ) {}

  async use(req: AuthMiddlewareRequest, res: Response, next: NextFunction) {
    if (
      !req.headers.authorization /* &&
      paths &&
      paths.some(path => req.originalUrl.includes(path)) */
    ) {
      req.user = {};
      return next();
    }
    if (
      !req.headers.authorization ||
      (req.headers.authorization as string).split(' ')[0] !== 'Bearer'
    ) {
      throw new UnauthorizedException();
    }

    const token = (req.headers.authorization as string).split(' ')[1];
    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_KEY || 'Secret');
    } catch (e) {
      throw new UnauthorizedException();
    }
    let speaker;
    try {
      speaker = await this.connection.getRepository(Speaker).findOne({
        where: {
          id: decoded.id,
          email: decoded.email,
        },
        relations: ['talks'],
      });
    } catch (e) {
      e;
    }

    if (!speaker) {
      throw new UnauthorizedException();
    }
    req.user = speaker;
    next();
  }
}
