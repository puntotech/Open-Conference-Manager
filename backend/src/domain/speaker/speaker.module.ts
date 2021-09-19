import { DatabaseModule } from '../database/database.module';
import { Module } from '@nestjs/common';
import { SpeakerController } from './speaker.controller';
import { SpeakerService } from './speaker.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Speaker } from './speaker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Speaker])],
  controllers: [SpeakerController],
  providers: [SpeakerService],
  exports: [SpeakerService],
})
export class SpeakerModule {}
