import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../../auth/schemas/user.schema';
import { Category } from 'src/category/schemas/category.schema';
// import { Category } from '../../category/schemas/category.schema';

// export enum Category {
//   ADVENTURE = 'Adventure',
//   CALSSICS = 'Classics',
//   CRIME = 'Crime',
//   FANTASY = 'Fantasy',
// }

@Schema({
  timestamps: true,
})
export class Book {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  author: string;

  @Prop()
  price: number;

  // @Prop()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  // category: Category;
  categoryId: Category;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const BookSchema = SchemaFactory.createForClass(Book);