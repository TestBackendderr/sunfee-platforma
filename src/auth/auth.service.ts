import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ERROR_MESSAGES } from 'src/common/constants';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);

    const payload = { sub: user.id, role: user.role };

    const tokens = await this.generateTokens(payload);

    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 10);

    await this.userService.update(user.id, {
      refreshToken: hashedRefreshToken,
    });

    return tokens;
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email);

    if (
      !user ||
      !(await this.userService.validatePassword(user.email, loginDto.password))
    ) {
      throw new UnauthorizedException(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    const payload = { sub: user.id, role: user.role };

    const tokens = await this.generateTokens(payload);

    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 10);

    await this.userService.update(user.id, {
      refreshToken: hashedRefreshToken,
    });

    return tokens;
  }

  async refresh({ refreshToken }: { refreshToken: string }) {
    if (!refreshToken) {
      throw new UnauthorizedException(ERROR_MESSAGES.NOT_REFRESH);
    }

    let payload;
    try {
      payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.REFRESH_SECRET,
      });
    } catch (error) {
      throw new UnauthorizedException(ERROR_MESSAGES.WRONG_REFRESH);
    }

    const user = await this.userService.findById(Number(payload.sub));

    if (!user || !user.refreshToken) {
      throw new UnauthorizedException(ERROR_MESSAGES.DIFFERENT_REFRESH);
    }

    const isMatch = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!isMatch) {
      throw new UnauthorizedException(ERROR_MESSAGES.DIFFERENT_REFRESH);
    }

    const newPayload = { sub: user.id, role: user.role };
    const newTokens = await this.generateTokens(newPayload);

    const hashedNewRefreshToken = await bcrypt.hash(newTokens.refreshToken, 10);
    await this.userService.update(user.id, {
      refreshToken: hashedNewRefreshToken,
    });

    return newTokens;
  }

  async generateTokens(payload: { sub: number; role: string }) {
    const accessToken = this.jwtService.sign(
      { sub: payload.sub.toString(), role: payload.role },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: '15m',
      },
    );

    const refreshToken = this.jwtService.sign(
      { sub: payload.sub.toString(), role: payload.role },
      {
        secret: process.env.REFRESH_SECRET,
        expiresIn: '7d',
      },
    );

    return { accessToken, refreshToken };
  }
}
