import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/sigup.dto';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(public readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({
    type: LoginDto,
    description: 'Credentials for login',
  })
  @ApiOperation({
    description: 'Login to the system; get access token',
  })
  login(@Request() req) {
    const token = this.authService.login(req.user);
    return { token };
  }

  @Post('signup')
  @ApiOperation({
    description: 'Signup for the user as Signee or Signer',
  })
  @ApiBody({
    type: SignupDto,
    description: 'Signup request',
  })
  signup(
    @Body('username') username,
    @Body('password') pwd,
    @Body('role') role = 'Signer' as const,
  ) {
    return this.authService.signup(username, pwd, role);
  }
}
