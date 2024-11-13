import { Module, ValidationPipe } from '@nestjs/common';
import { LoginUsersController } from './login-users/login-users.controller';
import { APP_PIPE } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [LoginUsersController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
      useValue: new ValidationPipe({
        whitelist: true, // Automatically strip properties that don't have decorators
        forbidNonWhitelisted: false, // Throw an error if non-whitelisted properties are present
        transform: false, // Automatically transform payloads to DTO classes
      }),
    },
  ],
})
export class UsersModule {}
