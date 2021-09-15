import { DatabaseModule } from '../database/database.module';
import { Module } from '@nestjs/common';
import { SpeakerController } from './speaker.controller';
import { SpeakerProvider } from './speaker.providers';
import { SpeakerService } from './speaker.service';

@Module({
  imports: [DatabaseModule],
  controllers: [SpeakerController],
  providers: [SpeakerProvider, SpeakerService],
})
export class SpeakerModule {}
