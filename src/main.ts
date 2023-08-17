import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { LoggerService } from './core/logger/logger.service';
import { TransformInterceptor } from './utils/interceptors/transform.interceptor';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';
import { ARizeGuard } from './guards/arize.guard';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
    rawBody: true,
    bodyParser: true,
  });
  const logger = app.get<LoggerService>(LoggerService);

  app.use(bodyParser.text());
  // app.use(cors);
  app.useLogger(app.get(LoggerService));

  app.useGlobalInterceptors(
    new TransformInterceptor(process.env.EXPOSE_ALL === 'true'),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.use(morgan('combined'));

  await app.listen(process.env.PORT || 3000);
  logger.verbose(`Server started on port ${process.env.PORT || 3000}`);
  logger.verbose(`visit: http://localhost:${process.env.PORT || 3000}`);
}

bootstrap();
