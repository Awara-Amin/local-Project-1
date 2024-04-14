import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { Document } from 'mongoose';
import { Test } from '../dto/create-patient.dto';
// import { PatientTestsDone } from './patient-testsDone.schema';
// import { GivenMedicine } from 'src/medicine/schemas/givenMedicine.schema';

// Nested Schema
@Schema()
export class BodyApi extends Document {
  @Prop()
  type: string;

  @Prop()
  content: string;
}
export const BodySchema = SchemaFactory.createForClass(BodyApi);
export const TestSchema = SchemaFactory.createForClass(Test);

//
// Parent Schema
@Schema({
  timestamps: true,
})
export class Patient {
  // export class Patient extends Document {
  //
  @Prop()
  name: string;

  @Prop()
  phoneNo: number;

  @Prop()
  gender: string;

  @Prop()
  age: number;

  @Prop()
  address: string;

  @Prop({ type: [BodySchema], default: [] })
  body: BodyApi;

  @Prop()
  test: Test[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  //this for an objectId
  //   @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'PatientTestsDone' })
  //   testDone?: PatientTestsDone; // we get only id here, but can be populated :)

  // This is for arryObjectId es kaka
  //   @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'GivenMedicine' }])
  //   givenMedicine?: GivenMedicine[];

  @Prop()
  readonly doctor_id: string;

  @Prop()
  readonly doctor_name: string;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);

// * eslint-disable prettier/prettier */
// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import mongoose from 'mongoose';
// import { User } from '../../auth/schemas/user.schema';
// import { Tests } from '../dto/create-test.dto';

// @Schema({
//   timestamps: true,
// })
// export class LabTests {
//   @Prop()
//   group: string;

//   @Prop()
//   tests: Tests[];

//   @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
//   user: User;
// }

// export const LabTestsSchema = SchemaFactory.createForClass(LabTests);
