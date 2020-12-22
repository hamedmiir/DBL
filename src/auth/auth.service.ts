import { Injectable } from '@nestjs/common';
import { UserServices } from '../user/user.service';
import UserEntity from '../db/entity/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user : UserEntity =  await UserEntity.findOne({where: { username }});
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserEntity) {
    const payload = { username: user.username, sub: user.id };
    return {
      message: 'Enjoy your token.',
      access_token: this.jwtService.sign(payload),
    };
  }
}