import { Module } from '@nestjs/common';
import { TalkController } from './talk.controller';
import { TalkService } from './talk.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Talk } from './talk.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Talk])],
  controllers: [TalkController],
  providers: [TalkService],
  exports: [TalkService],
})
export class TalkModule {}
