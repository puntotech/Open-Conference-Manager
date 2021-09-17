import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleAuthService } from './google-auth-service';
import { JwtModule } from '@nestjs/jwt';
import { Module, Global } from '@nestjs/common';
import { SpeakerModule } from '@modules/speaker/speaker.module';
import { jwtConstants } from 'jwt-constants';

@Global()
@Module({
  imports: [
    SpeakerModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleAuthService],
  exports: [AuthService],
})
export class AuthModule {}
