import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  ParseIntPipe,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TalkService } from './talk.service';
import { Talk } from './talk.entity';
import { AuthGuard } from '@guards/auth.guard';
import { User } from 'src/shared/decorators/user.decorator';
import { Speaker } from '@modules/speaker/speaker.entity';

@Controller('talks')
@UseGuards(AuthGuard)
export class TalkController {
  constructor(private readonly talkService: TalkService) {}

  @Get('/me')
  getBySpeakerId(@User() speaker: Speaker): Promise<Talk[]> {
    return this.talkService.getBySpeakerId(speaker.id);
  }

  @Get('/:id')
  getByID(@Param('id', ParseIntPipe) id: number): Promise<Talk> {
    return this.talkService.getByID(id);
  }

  @Get()
  getTalks(): Promise<Talk[]> {
    return this.talkService.getAll();
  }

  //TODO: add validation dto
  @Post()
  createTalk(
    @Body() talk: Partial<Talk>,
    @User() speaker: Speaker,
  ): Promise<Talk> {
    return this.talkService.create(talk, speaker);
  }

  //TODO: add validation dto
  @Put()
  updateTalk(@Body() talk: Partial<Talk>): Promise<Talk> {
    return this.talkService.update(talk);
  }

  @Delete('/:id')
  deleteTalk(@Param('id', ParseIntPipe) id: number): Promise<Talk> {
    return this.talkService.update({ id, status: false });
  }
}
