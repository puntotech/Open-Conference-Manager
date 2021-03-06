import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { SpeakerService } from './speaker.service';
import { Speaker } from './speaker.entity';
import { AuthGuard } from '@guards/auth.guard';
import { User } from 'src/shared/decorators/user.decorator';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { RolesGuard } from '@guards/roles.guard';
import { ROLES } from '@config/database.types';

@Controller('speakers')
@UseGuards(AuthGuard, RolesGuard)
export class SpeakerController {
  constructor(private readonly speakerService: SpeakerService) {}

  @Get('me')
  me(@User() user: Speaker): Speaker {
    return user;
  }

  @Put('me')
  updateMe(@Body() user: Speaker, @User() me: Speaker): Promise<Speaker> {
    const updateMe = {
      ...me,
      ...user,
      id: me.id,
    };
    return this.speakerService.update(updateMe);
  }

  @Get(':id')
  @Roles(ROLES.ADMIN)
  getByID(@Param('id', ParseIntPipe) id: number): Promise<Speaker> {
    return this.speakerService.findByID(id);
  }

  @Get()
  getSpeakers(@User() speaker: Speaker): Promise<Speaker[]> {
    return this.speakerService.findAll(speaker);
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
}
