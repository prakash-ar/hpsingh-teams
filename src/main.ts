import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { API_PREFIX } from './shared/constants/global.constants';
import { SwaggerConfig } from './configs/config.interface';
import { GLOBAL_CONFIG } from './configs/global.config';
import { MyLogger } from './modules/Logger/LoggerService';
import { InvalidFormExceptionFilter } from './filters/invalid.form.exception.filter';
import { AllExceptionsFilter } from './filters/all.exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'error', 'warn'],
  });

  app.setGlobalPrefix(API_PREFIX);

  app.useGlobalFilters(
    new AllExceptionsFilter(app.get(HttpAdapterHost)),
    new InvalidFormExceptionFilter(),
  );

  app.use(
    cors({
      origin: process.env.FRONTEND_URL,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      credentials: true,
    }),
  );

  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true, }));

  const configService = app.get<ConfigService>(ConfigService);
  const swaggerConfig = configService.get<SwaggerConfig>('swagger');

  // Swagger Api
  if (swaggerConfig.enabled) {
    const options = new DocumentBuilder()
      .setTitle(swaggerConfig.title || 'Nestjs')
      .setDescription(swaggerConfig.description || '')
      .setVersion(swaggerConfig.version || '1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'JWT',
          description: 'Enter JWT token',
          in: 'header',
        },
        'JWT-auth', // This name here is important for matching up with @ApiBearerAuth() in your controller!
      )
      .build();
    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup(swaggerConfig.path || 'api', app, document);
  }

  const PORT = process.env.PORT || GLOBAL_CONFIG.nest.port;
  await app.listen(PORT, async () => {
    const myLogger = await app.resolve(MyLogger);
    myLogger.log(`Server started listening: ${PORT}`);
  });
}
bootstrap();
