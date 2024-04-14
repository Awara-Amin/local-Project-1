import {
  IsArray,
  IsBoolean,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { User } from 'src/auth/schemas/user.schema';

export class Test{
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly price: number;

  @IsString()
  readonly id: string;
  @IsString()
  readonly result: string;
}
//
export class CreatePatientDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  readonly phoneNo: number;

  @IsNotEmpty()
  @IsString()
  readonly gender: string;

  @IsNotEmpty()
  @IsNumber()
  readonly age: number;

  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @IsEmpty({ message: 'You cannot pass user id' })
  readonly user: User;

  @IsArray()
  readonly tests: Test[];

  // @IsOptional()
  // @ValidateNested()
  // @Type(() => CreatPatientTestsDoneDto)
  // readonly testDone?: CreatPatientTestsDoneDto;

  @IsOptional()
  readonly doctor_id: string;

  @IsOptional()
  readonly doctor_name: string;
}
