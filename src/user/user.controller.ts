import { Body, Controller, Get, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { UserServices } from './user.service';
import CreateUserDto from './dto/create-user.dto';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly usersServices: UserServices) {}

//'postUser()' will handle the creating of new User
  @ApiResponse({status: 200, description: 'Insert user'})
  @Post()
  postUser( @Body() user: CreateUserDto) {
    return this.usersServices.insert(user);
  }
// 'getAll()' returns the list of all the existing users in the database
  @ApiResponse({status: 200, description: 'Get all users'})
  @Get()
  getAll() {
    return this.usersServices.getAllUsers();
  }

//'getBooks()' return all the books which are associated with the user
// provided through 'userID' by the request
  @ApiResponse({status: 200, description: 'Get all books of a user'})
  @ApiQuery({
    name: 'userID',
    required: true,
    type: Number
  })
  @Get('books')
  getBooks( @Query('userID', ParseIntPipe) userID: number ) {
    return this.usersServices.getBooksOfUser(userID);
  }
}
