import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './schemas/book.schema';

import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';

@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  async getAllBooks(@Query() query: ExpressQuery): Promise<Book[]> {
    return this.bookService.findAll(query);
  }

  @Post()
  @UseGuards(AuthGuard())
  async createBook(
    @Body()
    // book: CreateBookDto,
    book,
    @Req() req,
    // @Req() req: Request,
  ): Promise<Book> {
    // console.log('do we reach to nestJs---3', req);
    console.log('do we reach to nestJs---33333-1', req.body);
    console.log('do we reach to nestJs---3', req.user);
    // console.log(AuthGuard);
    // return book;
    // return this.bookService.create(book, req.user);
    return this.bookService.create(book, req.user);
  }

  @Post('/update')
  // @UseGuards(AuthGuard())
  async updateWholeBook(
    @Body()
    // book: CreateBookDto,
    book,
    @Req() req: Request,
  ): Promise<Book> {
    console.log('do we reach to nestJs---3-1', req.headers);
    // return book;
    // return this.bookService.create(book, req.user);
    return this.bookService.save(book);
  }
  @Get(':id')
  async getBook(
    @Param('id')
    id: string,
  ): Promise<Book> {
    return this.bookService.findById(id);
  }

  @Put(':id')
  async updateBook(
    @Param('id')
    id: string,
    @Body()
    // book: UpdateBookDto,
    book,
  ): Promise<Book> {
    console.log('do we reach to nestJs---3-3');
    console.log('what is id', id);
    console.log('what is book', book);
    return this.bookService.updateById(id, book);
  }

  @Delete(':id')
  async deleteBook(
    @Param('id')
    id: string,
  ): Promise<Book> {
    console.log('do we reach to delete in nestJs---44444');

    return this.bookService.deleteById(id);
  }
}
