import { Body, Controller, Delete, Get, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import CreateBookDto from './dto/create-book.dto';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('book')
export class BooksController {
  constructor(private readonly booksServices: BooksService) {}

  @ApiResponse({status: 200, description: 'Insert Book'})
  @Post()
  postUser( @Body() book: CreateBookDto) {
    return this.booksServices.insert(book);
  }

// 'getAll()' returns the list of all the existing users in the database
  @ApiResponse({status: 200, description: 'Get all books'})
  @Get()
  getAll() {
    return this.booksServices.getAllBooks();
  }

  @ApiResponse({status: 200, description: 'Delete a book'})
  @ApiQuery({
    name: 'bookID',
    required: true,
    type: Number
  })
  @Delete()
  deleteBook(@Query('bookID', ParseIntPipe) bookID: number) {
    return this.booksServices.delete(bookID)
  }

  @ApiResponse({status: 200, description: 'Modify a book'})
  @ApiQuery({
    name: 'bookID',
    required: true,
    type: Number
  })
  @Put()
  modifyBook(@Query('bookID', ParseIntPipe) bookID: number, @Body() book: CreateBookDto) {
    return this.booksServices.modify(bookID, book);
  }
}
