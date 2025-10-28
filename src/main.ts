import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Microservicio de Telemetria')
    .setDescription('API para la gestión de la telemetría de vehículos')
    .setVersion('1.0')
    // Si usas JWT:
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    // opciones extra si quieres (ej: custom siteTitle)
    swaggerOptions: { persistAuthorization: true },
    customSiteTitle: 'Docs - Auth Service',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
