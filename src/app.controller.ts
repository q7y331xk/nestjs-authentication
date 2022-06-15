import { LocalAuthGuard } from './auth/guards/local.gurad';
import { JwtAuthGuard } from './auth/guards/jwt.guard';
import { AuthService } from './auth/auth.service';
import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
