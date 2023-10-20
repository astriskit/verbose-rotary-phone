import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    public readonly userService: UsersService,
    public readonly jwtService: JwtService,
  ) {}

  validateUser(username: string, password: string) {
    const user = this.userService.findByEmail(username);
    if (user?.password !== password) throw new Error('Invalid password');
    return { email: user?.email, id: user?.id };
  }

  login(user: User) {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  //   logout(username: string) {}

  signup(username: string, password: string, role: User['role'] = 'Signee') {
    return this.userService.create({ email: username, password, role });
  }
}
