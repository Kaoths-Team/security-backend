import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { XSS } from './middlewares/xss.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.use(XSS());
  app.enableCors({
    origin: 'security-blog-frontend.netlify.app'
  });
  app.use(
    rateLimit({
      windowMs: 5 * 60 * 1000,
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
