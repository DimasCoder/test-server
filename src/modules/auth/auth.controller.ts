import { AuthService } from '@modules/auth/auth.service';
import { RegisterUserDto } from '@modules/auth/dto/register-user.dto';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/registration')
  async userRegistration(@Body() registrationData: RegisterUserDto) {
    return this.authService.registerUser(registrationData)
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async userLogin(@Body() body) {
    return this.authService.login(body.email)
  }
}
