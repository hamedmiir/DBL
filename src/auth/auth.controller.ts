import { Controller, Post, UseGuards, Body, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ApiResponse } from '@nestjs/swagger';
import { LocalAuthGuard } from './local-auth-guard';
import { Public } from './public';

@Controller('auth')
export class AuthController {
  constructor(private readonly authServices: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiResponse({ status : 200, description: 'Login With Username and Password'} )
  @Public()
  @Post('login')
  async login(@Request() req) {
    return this.authServices.login(req.user);
  }
}
