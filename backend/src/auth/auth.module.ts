import { Module, Session } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { FortyTwoStrategy } from './fortytwo.strategy';
import { AuthController } from './auth.controller';
import { SessionSerializer } from './session.serializer';
import { PlayerService } from 'src/player/player.service';
import { AuthService } from './auth.service';

@Module({
    imports: [
      PassportModule.register({ defaultStrategy: '42' , session: true}),
    ],
    providers: [
    FortyTwoStrategy,
    SessionSerializer,
    PlayerService,
    AuthService,
    ],
    controllers: [AuthController],
    exports: [PassportModule],
  })
  
  export class AuthModule {}
  