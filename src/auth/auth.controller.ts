import { Controller, Post, Body, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: any) {
    try {
      this.logger.log(`Login request: ${JSON.stringify(loginDto)}`);
      const response = await this.authService.login(loginDto);
      this.logger.log(`Login response: ${JSON.stringify(response)}`);
      return response;
    } catch (error) {
      this.logger.error(`Login controller error: ${error.message}`, error.stack);
      throw error;
    }
  }
}
