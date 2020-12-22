import { Injectable } from '@nestjs/common';
import { UserServices } from '../user/user.service';
import UserEntity from '../db/entity/user.entity';

@Injectable()
export class AuthService {
  async validateUser(username: string, pass: string): Promise<any> {
    const user : UserEntity =  await UserEntity.findOne({where: { username }});
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}