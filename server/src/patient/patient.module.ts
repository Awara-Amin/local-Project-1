import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { PatientSchema } from './schemas/patient.schema';
import { AuthModule } from 'src/auth/auth.module';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
// import {
//   PatientTestsDone,
//   PatientTestsDoneSchema,
// } from './schemas/patient-testsDone.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Patient', schema: PatientSchema }]),
  ],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
