import {
  Controller,
  Post,
  Body,
  Req,
  Res,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Request, Response } from 'express';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto,
    @Res() response: Response,
  ) {
    const tokens = await this.authService.register(createUserDto);
    response.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
    });
    return response.json({ accessToken: tokens.accessToken });
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() response: Response) {
    const tokens = await this.authService.login(loginDto);
    response.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
    });
    return response.json({ accessToken: tokens.accessToken });
  }

  @Post('logout')
  async logout(@Res() response: Response) {
    response.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });
    return response.status(200).send({ message: 'Logged out successfully' });
  }

  @Get('me')
  @UseGuards(AuthGuard)
  getMe(@Req() req: Request) {
    const user = req['user'];
    return { user };
  }

  @Post('refresh')
  async refresh(@Req() request: Request, @Res() response: Response) {
    const refreshToken = request.cookies['refreshToken'];
    const tokens = await this.authService.refresh({ refreshToken });
    response.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
    });
    return response.json({ accessToken: tokens.accessToken });
  }
}
