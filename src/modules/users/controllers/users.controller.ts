import { Body, Controller, Get, Post } from '@nestjs/common';
import { SignupDto } from './DTO/signup.dto';
import { UserService } from '../services/users-service';

@Controller()
export class UsersController {
  constructor(private _UserService: UserService) {}
  @Get('/')
  GetHello() {
    return { message: 'Welcome to the user page' };
  }
  // Implement your login logic here
  @Post('/login')
  Login() {
    // Add your login logic here
    return {
      message: 'User logged in successfully',
    };
  }

  @Post('/signup')
  SignUp(@Body() user_data: SignupDto) {
    return this._UserService.signupUser(user_data);
  }
}
