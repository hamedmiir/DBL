import { Body, Controller, Delete, Get, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { UserServices } from './user.service';
import CreateUserDto from './dto/create-user.dto';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Public } from '../auth/public';

@Controller('user')
export class UserController {
  constructor(private readonly usersServices: UserServices) {}

//'postUser()' will handle the creating of new User
  @ApiResponse({status: 200, description: 'Insert user'})
  @Public()
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

  @ApiResponse({status: 200, description: 'Delete a user'})
  @ApiQuery({
    name: 'userID',
    required: true,
    type: Number
  })
  @Delete()
  deleteBook(@Query('userID', ParseIntPipe) userID: number) {
    return this.usersServices.delete(userID)
  }

  @ApiResponse({status: 200, description: 'Modify a user'})
  @ApiQuery({
    name: 'userID',
    required: true,
    type: Number
  })
  @Put()
  modifyBook(@Query('userID', ParseIntPipe) userID: number, @Body() user: CreateUserDto) {
    return this.usersServices.modify(userID, user);
  }
}
