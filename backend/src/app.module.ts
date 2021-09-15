import { SpeakerModule } from 'src/domain/speaker/speaker.module';
import { Module } from '@nestjs/common';
import { AuthModule } from '@modules/auth/auth.module';

@Module({
  imports: [SpeakerModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
