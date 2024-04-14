import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { User } from './schemas/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/forgetPassword')
  forgetPassword(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.forgetPassword(signUpDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    console.log('arrived to backend inside auth.controller.ts');
    return this.authService.login(loginDto);
  }

  @Get('/user/:id')
  async getUser(
    @Param('id')
    id: string,
  ): Promise<User> {
    return this.authService.findById(id);
  }
}
