import { DatabaseModule } from '../database/database.module';
import { Module } from '@nestjs/common';
import { TalkController } from './talk.controller';
import { TalkProvider } from './talk.providers';
import { TalkService } from './talk.service';

@Module({
  imports: [DatabaseModule],
  controllers: [TalkController],
  providers: [TalkProvider, TalkService],
})
export class TalkModule {}
