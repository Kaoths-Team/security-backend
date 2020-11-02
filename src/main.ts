import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import * as helmet from 'helmet';
import * as csurf from 'csurf';
import * as rateLimit from 'express-rate-limit';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    helmet({
      permittedCrossDomainPolicies: { permittedPolicies: 'all' },
    })
  );
  // app.use(session({
  //   secret: process.env.JWT_SECRET,
  //   resave: false,
  //   saveUninitialized: false,
  // }))
  // app.use(csurf())
  app.use(
    rateLimit({
      windowMs: 5 * 60 * 1000, // 5 mins
      max: 100,
    })
  );
  app.useGlobalGuards(new JwtAuthGuard(app.get(Reflector)));

  const options = new DocumentBuilder()
    .setTitle('Security blog project')
    .setVersion('0.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
