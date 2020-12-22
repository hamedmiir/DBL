import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authServices: AuthService) {}

  @ApiResponse({ status : 200, description: 'Login With Username and Password'} )
  @Post('login')
  async login(@Body() credential : any) {
    const {username, password} = credential;
    return await this.authServices.validateUser(username, password);
  }
}
