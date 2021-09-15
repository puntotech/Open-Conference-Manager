import { Connection } from 'typeorm';

import { Provider } from '@nestjs/common';

import { SpeakerRepository } from './speaker.repository';
import { DB_CONNECTION_TOKEN } from '../../shared/config/database.tokens.constants';

export const SpeakerProvider: Provider = {
  provide: SpeakerRepository,
  useFactory: (connection: Connection) =>
    connection.getCustomRepository(SpeakerRepository),
  inject: [DB_CONNECTION_TOKEN],
};
