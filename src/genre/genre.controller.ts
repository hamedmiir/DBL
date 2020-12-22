import { Body, Controller, Delete, Get, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import GenreServices from './genre.service';
import CreateGenreDto from './dto/create-genre.dto';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('genre')
export default class GenreController {
  constructor(private readonly genreServices: GenreServices) {}

  @ApiResponse({status: 200, description: 'Insert genre'})
  @Post()
  postGenre( @Body() genre: CreateGenreDto) {
    return this.genreServices.insert(genre);
  }

  @ApiResponse({status: 200, description: 'Get all genres'})
  @Get()
  getAll() {
    return this.genreServices.getAllGenre();
  }

  @ApiResponse({status: 200, description: 'Delete a genre'})
  @ApiQuery({
    name: 'genreID',
    required: true,
    type: Number
  })
  @Delete()
  deleteBook(@Query('genreID', ParseIntPipe) genreID: number) {
    return this.genreServices.delete(genreID)
  }

  @ApiResponse({status: 200, description: 'Modify a genre'})
  @ApiQuery({
    name: 'genreID',
    required: true,
    type: Number
  })
  @Put()
  modifyBook(@Query('genreID', ParseIntPipe) genreID: number, @Body() genre: CreateGenreDto) {
    return this.genreServices.modify(genreID, genre);
  }
}