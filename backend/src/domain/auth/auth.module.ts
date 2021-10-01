import { Global, Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FacebookStrategy } from './facebook/facebookStrategy';
import { GoogleAuthService } from './google/google-auth.service';
import { JwtModule } from '@nestjs/jwt';
import { SpeakerModule } from '@modules/speaker/speaker.module';
import { TalkModule } from '@modules/talk/talk.module';
import { TwitterAuthService } from './twitter/twitter.service';

@Global()
@Module({
  imports: [
    SpeakerModule,
    TalkModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    TwitterAuthService,
    GoogleAuthService,
    FacebookStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
