import { Controller, Get, Post } from '@nestjs/common';

@Controller()
export class LoginUsersController {
  @Get('/')
  GetHello() {
    return { message: 'Welcome to the login page' };
  }
  // Implement your login logic here
  @Post('/login')
  Login() {
    // Add your login logic here
    return {
      message: 'User logged in successfully',
    };
  }
}
