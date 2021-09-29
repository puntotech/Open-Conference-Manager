import { Module } from '@nestjs/common';
import { Speaker } from './speaker.entity';
import { SpeakerController } from './speaker.controller';
import { SpeakerService } from './speaker.service';
import { TalkModule } from '@modules/talk/talk.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Speaker])],
  controllers: [SpeakerController],
  providers: [SpeakerService],
  exports: [SpeakerService],
})
export class SpeakerModule {}
