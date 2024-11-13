import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NotFoundRedirectFilter } from './Filters/NotFoundRedirectFilter';
import { MyLogger } from './configuration/Logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new MyLogger(),
  });

  // Apply the NotFoundRedirectFilter globally
  app.useGlobalFilters(new NotFoundRedirectFilter());

  await app.listen(process.env.PORT ?? 3000, () => {
    console.log(
      `Server is running on port ${process.env.PORT} \n http://localhost:${process.env.PORT}/api`,
    );
  });
}
bootstrap();
