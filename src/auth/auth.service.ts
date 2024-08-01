import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    //verificar o usuário no banco de dados
    if (username === 'test' && pass === 'test') {
      return { userId: 1, username: 'test' };
    }
    return null;
  }

  async login(loginDto: any) {
    try {
      const user = await this.validateUser(loginDto.username, loginDto.password);
      if (!user) {
        this.logger.warn(`Invalid credentials for user: ${loginDto.username}`);
        throw new NotFoundException('Invalid credentials');
      }
      const payload = { username: user.username, sub: user.userId };
      const accessToken = this.jwtService.sign(payload);
      return {
        access_token: accessToken,
      };
    } catch (error) {
      this.logger.error(`AuthService login error: ${error.message}`, error.stack);
      throw error;
    }
  }
}
