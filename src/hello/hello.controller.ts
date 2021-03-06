import { Body, Controller, Get, Header, Post, Query } from '@nestjs/common';
import { HelloService } from './hello.service';
import { PersonDto } from './dto/person.dto';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('hello')
export class HelloController {
  constructor(
    private readonly helloService: HelloService
  ) {}

  @Post('welcome')
  @Header('Content-Type', 'application/json')
  @ApiResponse({status: 200, description: 'Say Hello!'})
  async sayWelcome(@Body() personDto: PersonDto): Promise<{data: String}> {
    let msg = await this.helloService.welcome(personDto);
    return {data : msg};
  }

  @ApiResponse({status: 200})
  @ApiQuery({
    name: 'name',
    required: true,
    type: String
  })
  @ApiQuery({
    name: 'year',
    required: false,
    type: Number,
    description: 'You can ignore this'
  })
  @Get('welcome')
  async sayWelcome2(@Query('name') iName, @Query('year') iYear): Promise<{data : String}>{
    let msg = await this.helloService.welcome({name: iName, year: iYear});
    return { data: msg };
  }
}
