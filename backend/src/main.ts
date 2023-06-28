import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import { AppModule } from './app.module';
import * as passport from 'passport';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:8080',
    credentials: true,
  });
  app.use(
    session({
      name: 'session',
      secret: 'wow-such-secret-much-security',
      resave: false,
      saveUninitialized: false,
      cookie: { 
        maxAge: 6000000,
      },
    })
    )
    app.use(passport.initialize());
    app.use(passport.session());
  await app.listen(3000);
}
bootstrap();