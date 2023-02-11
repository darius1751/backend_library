import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function main() {
  const app = await NestFactory.create(AppModule);
  await app.useGlobalPipes(new ValidationPipe({
    forbidNonWhitelisted:true,
    always:true,
    forbidUnknownValues:true,
  }));
  await app.enableCors()
  await app.setGlobalPrefix('/v1/api');
  await app.listen(3000);
}
main();
