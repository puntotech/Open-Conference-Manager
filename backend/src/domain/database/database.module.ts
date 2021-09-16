import * as configDatabase from '../../../config-database.json';

import {
  DB_CONFIGURATION_TOKEN,
  DB_CONNECTION_TOKEN,
} from '../../shared/config/database.tokens.constants';
import { Global, Module } from '@nestjs/common';

import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Speaker } from '../speaker/speaker.entity';
import { Talk } from '@modules/talk/talk.entity';
import { createConnection } from 'typeorm';

const providersExported: any[] = [
  {
    provide: DB_CONNECTION_TOKEN,
    useFactory: createConnection,
    inject: [DB_CONFIGURATION_TOKEN],
  },
];

@Global()
@Module({
  providers: [
    ...providersExported,
    {
      provide: DB_CONFIGURATION_TOKEN,
      useValue: {
        ...configDatabase,
        type: 'mariadb',
        host: '127.0.0.1',
        dropSchema: false,
        namingStrategy: new SnakeNamingStrategy(),
        entities: [Speaker, Talk],
        extra: {
          multipleStatements: true,
          connectionLimit: 100,
        },
      },
    },
  ],
  exports: providersExported,
})
export class DatabaseModule {}
