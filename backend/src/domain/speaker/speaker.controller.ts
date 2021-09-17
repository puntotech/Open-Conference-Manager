import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Param,
  UseInterceptors,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { SpeakerService } from './speaker.service';
import { Speaker } from './speaker.entity';
import { AuthGuard } from '@guards/auth.guard';
import { AdminGuard } from '@guards/admin.guard';
import { User } from 'src/shared/decorators/user.decorator';

@Controller('speakers')
//@UseGuards(AuthGuard, AdminGuard)
export class SpeakerController {
  constructor(private readonly speakerService: SpeakerService) {}

  @Get(':id')
  getByID(@Param('id', ParseIntPipe) id: number): Promise<Speaker> {
    return this.speakerService.findByID(id);
  }

  @Get()
  getSpeakers(): Promise<Speaker[]> {
    return this.speakerService.findAll();
  }

  @Post()
  //TODO: add validation dto
  createSpeaker(@Body() speaker: Partial<Speaker>): Promise<Speaker> {
    return this.speakerService.create(speaker);
  }
  //TODO: add validation dto
  @Put()
  updateSpeaker(@Body() speaker: Partial<Speaker>): Promise<Speaker> {
    return this.speakerService.update(speaker);
  }

  @Post('me')
  me(@User() user: Speaker): Speaker {
    return user;
  }
}