import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleAuthService } from './google-auth-service';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { SpeakerModule } from '@modules/speaker/speaker.module';

@Module({
  imports: [JwtModule.register(null), SpeakerModule],
  controllers: [AuthController],
  providers: [AuthService, GoogleAuthService],
  exports: [],
})
export class AuthModule {}
