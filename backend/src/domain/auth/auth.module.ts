import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleAuthService } from './google/google-auth.service';
import { JwtModule } from '@nestjs/jwt';
import { Module, Global } from '@nestjs/common';
import { SpeakerModule } from '@modules/speaker/speaker.module';
import { TalkModule } from '@modules/talk/talk.module';
import { FacebookStrategy } from './facebook/facebookStrategy';
import { HttpModule } from '@nestjs/axios';

@Global()
@Module({
  imports: [
    HttpModule,
    SpeakerModule,
    TalkModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleAuthService, FacebookStrategy],
  exports: [AuthService],
})
export class AuthModule {}
