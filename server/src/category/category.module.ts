import { Module } from '@nestjs/common';
// import { SpecialityController } from './speciality.controller';
// import { SpecialityService } from './speciality.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from './schemas/category.schema';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { AuthModule } from 'src/auth/auth.module';
// import { SpecialitySchema } from './schemas/speciality.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      //       { name: 'Speciality', schema: SpecialitySchema },
      { name: 'Category', schema: CategorySchema },
    ]),
  ],
  //   controllers: [SpecialityController],
  controllers: [CategoryController],
  //   providers: [SpecialityService],
  providers: [CategoryService],
})
export class CategoryModule {}
