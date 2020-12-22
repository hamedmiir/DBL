import { Injectable } from '@nestjs/common';
import UserEntity from '../db/entity/user.entity';
import CreateUserDto from './dto/create-user.dto';
import BookEntity from '../db/entity/book.entity';
import GenreEntity from '../db/entity/genre.entity';

@Injectable()
export class UserServices {

  async insert(userDetails: CreateUserDto): Promise<UserEntity> {
    const userEntity: UserEntity = UserEntity.create();
    const {name} = userDetails;
    userEntity.name = name;
    await UserEntity.save(userEntity);
    return userEntity;
  }
  async getAllUsers(): Promise<UserEntity[]> {
    return await UserEntity.find();
  }
  async getBooksOfUser(userID: number): Promise<BookEntity[]> {
    const user: UserEntity = await UserEntity.findOne({where: {id: userID}, relations: ['books']});
    return user.books;
  }

  async delete(userID : number): Promise<UserEntity> {
    const user : UserEntity = await UserEntity.findOne({where : {id: userID}});
    await UserEntity.delete(userID);
    return user;
  }

  async modify(userID: number, userDetails: CreateUserDto) : Promise<UserEntity> {
    const existingUser : UserEntity = await UserEntity.findOne({id: userID});
    if (userDetails.name)
      existingUser.name = userDetails.name;
    await existingUser.save();
    return existingUser;
  }
}