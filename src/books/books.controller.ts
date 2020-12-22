import { Body, Controller, Get, Post } from '@nestjs/common';
import { BooksService } from './books.service';
import CreateBookDto from './dto/create-book.dto';
import { ApiResponse } from '@nestjs/swagger';

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
}
