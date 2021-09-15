import { Connection } from 'typeorm';

import { Provider } from '@nestjs/common';

import { TalkRepository } from './talk.repository';
import { DB_CONNECTION_TOKEN } from '../../shared/config/database.tokens.constants';

export const TalkProvider: Provider = {
  provide: TalkRepository,
  useFactory: (connection: Connection) =>
    connection.getCustomRepository(TalkRepository),
  inject: [DB_CONNECTION_TOKEN],
};
