import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLogger } from './configuration/Logger';
import { setup_app } from './app-setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new MyLogger(),
  });

  setup_app(app);
  await app.listen(process.env.PORT ?? 3000, () => {
    console.log(
      `Server is running on port ${process.env.PORT} \n http://localhost:${process.env.PORT}/api`,
    );
  });
}
bootstrap();
