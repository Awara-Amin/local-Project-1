import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Query } from 'express-serve-static-core';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Patient } from './schemas/patient.schema';
import { User } from 'src/auth/schemas/user.schema';
//         import { PatientTestsDone } from './schemas/patient-testsDone.schema';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient.name)
    private patientModel: mongoose.Model<Patient>, //   @InjectModel(PatientTestsDone.name) //   private patientTestsDoneModel: mongoose.Model<PatientTestsDone>,
  ) {}

  async create(patient: Patient, user: User): Promise<Patient> {
    const data = Object.assign(patient, { user: user._id });

    const res = await this.patientModel.create(data);
    return res;
  }

  //create speciality
  async findAll(query: Query): Promise<Patient[]> {
    const res = await this.patientModel.find(query);
    console.log('res---March-6-22222222');
    console.log(res);
    console.log(res.length);
    return res;
  }

  async findById(id: string): Promise<Patient> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Please enter correct id.');
    }

    const patient = await this.patientModel.findById(id);

    if (!patient) {
      throw new NotFoundException('Patient not found.');
    }

    return patient;
  }

  async updateById(id: string, book: Patient): Promise<Patient> {
    console.log('do we reach to nestJs---March-31-2');
    return await this.patientModel.findByIdAndUpdate(id, book, {
      new: true,
      runValidators: true,
    });
  }
}
