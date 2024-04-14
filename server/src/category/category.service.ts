import { Injectable } from '@nestjs/common';
// import { Speciality } from './schemas/speciality.schema';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schemas/category.schema';
import { Query } from 'express-serve-static-core';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: mongoose.Model<Category>,
  ) {}

  //create speciality
  async findAll(query: Query): Promise<Category[]> {
    const res = await this.categoryModel.find(query);
    return res;
  }
  //create speciality
  async create(category: Category): Promise<Category> {
    const res = await this.categoryModel.create(category);
    return res;
  }
}
