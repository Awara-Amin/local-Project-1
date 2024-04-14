import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
// import { SpecialityService } from './speciality.service';
import { AuthGuard } from '@nestjs/passport';
// import { Speciality } from './schemas/speciality.schema';
import { Category } from './schemas/category.schema';
import { CategoryService } from './category.service';
import { Query as ExpressQuery } from 'express-serve-static-core';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  // the API route is: http://localhost:3000/speciality

  @Get()
  async getAllCategories(@Query() query: ExpressQuery): Promise<Category[]> {
    return this.categoryService.findAll(query);
  }

  @Post()
  @UseGuards(AuthGuard())
  async createDoctor(
    @Body()
    speciality,
  ): Promise<Category> {
    //
    console.log('req inside post category bra');
    //     console.log(req);
    //     console.log(req.user);
    return this.categoryService.create(speciality);
  }
}
