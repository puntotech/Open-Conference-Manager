import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Param,
  UseInterceptors,
  Put,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { TalkService } from './talk.service';
import { Talk } from './talk.entity';
import { AuthGuard } from '@guards/auth.guard';

@Controller('talks')
//@UseGuards(AuthGuard)
export class TalkController {
  constructor(private readonly talkService: TalkService) {}

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
  createTalk(@Body() talk: Partial<Talk>): Promise<Talk> {
    return this.talkService.create(talk);
  }

  //TODO: add validation dto
  @Put()
  updateTalk(@Body() talk: Partial<Talk>): Promise<Talk> {
    return this.talkService.update(talk);
  }
}
