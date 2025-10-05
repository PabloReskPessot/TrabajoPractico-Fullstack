import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //sugerencia de chat gpt para validacion global de dto
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,            // quita props extra no declaradas en DTO
    forbidNonWhitelisted: true, // lanza error si vienen props no permitidos
    transform: true,            // transforma payloads a los tipos de DTO (importante) // transform: true es clave: convierte strings a numbers si usás @Type(() => Number) en el DTO.
  }));

  app.enableCors();

  // // 🟢 Habilitar CORS para el front de Vue
  // app.enableCors({
  //   origin: 'http://localhost:5173', // la URL del front
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   credentials: true, // si necesitás enviar cookies o headers auth
  // });

  //Si querés permitir más orígenes (por ejemplo, producción)
  //   app.enableCors({
  //   origin: ['http://localhost:5173', 'https://miapp.com'],
  // });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
