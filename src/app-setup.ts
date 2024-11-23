// import { ValidationPipe } from '@nestjs/common';
// import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NotFoundRedirectFilter } from './Filters/NotFoundRedirectFilter';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
export const setup_app = (app: any) => {
  app.enableCors();
  useContainer(app.select(AppModule), { fallbackOnErrors: true }); // to can custom validate read injection or any db
  //   app.useGlobalPipes(
  //     new ValidationPipe({
  //       whitelist: true,
  //     }),
  //   );
  /**
   * whitelist: Strips out properties not included in the DTO.
      forbidNonWhitelisted: Throws an error if non-whitelisted properties are found.
      transform: Automatically transforms the input data to the types expected by the DTO.
   */

  // Apply the NotFoundRedirectFilter globally
  app.useGlobalFilters(new NotFoundRedirectFilter());
  const config = new DocumentBuilder()
    .setTitle('NGRX Document')
    .setDescription('The NGRX-EXAMPLE API description')
    .setVersion('1.0')
    .addSecurity('bearer', {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: '', // Set this to an empty string to avoid adding "Bearer " prefix
      description: 'Enter the token without "Bearer " prefix',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      requestInterceptor: (req) => {
        const authHeader =
          req.headers['Authorization'] || req.headers['authorization'];
        if (authHeader && authHeader.startsWith('Bearer ')) {
          req.headers['Authorization'] = authHeader.slice(7); // Remove 'Bearer ' prefix
        }
        return req;
      },
      responseInterceptor: (res) => {
        if (res.url.endsWith('/user/login') && res.status === 201) {
          const token = res.body.token;
          if (token) {
            (<any>window).ui.preauthorizeApiKey('bearer', token);
          }
        }
        return res;
      },
    },
  });
};
