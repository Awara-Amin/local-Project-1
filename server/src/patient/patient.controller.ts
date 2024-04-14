import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Query as ExpressQuery } from 'express-serve-static-core';

import { PatientService } from './patient.service';
import { AuthGuard } from '@nestjs/passport';
import { Patient } from './schemas/patient.schema';
import { CreatePatientDto } from './dto/create-patient.dto';

@Controller('patient')
export class PatientController {
  constructor(private patientService: PatientService) {}

  //
  @Post()
  @UseGuards(AuthGuard())
  async createPatient(
    @Body()
    patient,
    @Req()
    req,
  ): Promise<Patient> {
    console.log('do we reach to nestJs---Marck-NestJs-1', req);
    const resp = await this.patientService.create(patient, req.user);
    return resp;
  }
  @Get(':id')
  async getBook(
    @Param('id')
    id: string,
  ): Promise<Patient> {
    //     return this.patientService.findById(id);
    return await this.patientService.findById(id);
  }

  @Get()
  async getAllPatients(@Query() query: ExpressQuery): Promise<Patient[]> {
    return this.patientService.findAll(query);
  }

  @Put(':id')
  async updateBook(
    @Param('id')
    id: string,
    @Body()
    // patient: UpdateBookDto,
    patientKaka,
  ): Promise<Patient> {
    console.log('do we reach to nestJs---March-31-1');
    // console.log('what is id', id);
    // console.log('what is book', patientKaka);
    return this.patientService.updateById(id, patientKaka);
  }
}
