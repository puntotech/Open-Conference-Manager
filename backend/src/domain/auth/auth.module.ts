import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleAuthService } from './google/google-auth.service';
import { JwtModule } from '@nestjs/jwt';
import { Module, Global } from '@nestjs/common';
import { SpeakerModule } from '@modules/speaker/speaker.module';
import { TalkModule } from '@modules/talk/talk.module';
import { FacebookStrategy } from './facebook/facebookStrategy';
import { HttpModule } from '@nestjs/axios';
import { TwitterStrategy } from './twitter/twitter.strategy';
import { TwitterAuthService } from './twitter/twitter.service';
import { PassportModule } from '@nestjs/passport';

@Global()
@Module({
  imports: [
    HttpModule,
    SpeakerModule,
    TalkModule,
    PassportModule,
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
    TwitterStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
