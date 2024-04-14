import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogConfig,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PatientService } from '../../../../services/patient/patient.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ProductService } from '../../../../services/product/product.service';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-add-patient',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatGridListModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './add-patient.component.html',
  styleUrl: './add-patient.component.css',
})
export class AddPatientComponent implements OnInit {
  // we should define variables first
  categoryList: any[] = [];
  allDoctors: any[] = [];

  form!: FormGroup;
  title!: string;
  _id!: string;
  name!: string;
  phoneNo!: string;
  gender!: string;
  age!: number;
  address!: string;
  body!: [''];
  buttonName!: string;
  doctor_name!: string;
  doctor_id!: string;

  //
  constructor(
    private patientSrv: PatientService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: any,
    private dialogRef: MatDialogRef<AddPatientComponent>,
    private productSrv: ProductService
  ) {
    this.title = data.title;
    this._id = data._id;
    this.name = data.name;
    this.phoneNo = data.phoneNo;
    this.gender = data.gender;
    this.age = data.age;
    this.address = data.address;
    this.buttonName = data.buttonName;
    this.doctor_id = data.doctor_id;
    this.doctor_name = data.doctor_name;
  }
  ngOnInit(): void {
    this.getAllDoctors();
    //for editing part they go into the form
    this.form = this.fb.group({
      _id: [this._id, []],
      name: [this.name, [Validators.required]],
      title: [this.title, [Validators.required]],
      phoneNo: [this.phoneNo, [Validators.required, Validators.maxLength(15)]],
      gender: [this.gender, [Validators.required]],
      age: [this.age, []],
      address: [this.address, [Validators.required]],
      doctor_id: [this.doctor_id, []],
      doctor_name: [this.doctor_name, []],
    });
  }

  getAllDoctors() {
    this.productSrv.getBooks().subscribe((res: any) => {
      console.log('doctors inside add-patioent.comp.ts---March-5');
      console.log(res);
      this.allDoctors = res.map((e: any) => {
        console.log('doctors inside add-patioent.comp.ts---March-5-1');
        console.log(e.author);
        const doctor = {
          doctor_name: e.author,
          doctor_id: e._id,
        };
        console.log('doctors inside add-patioent.comp.ts---March-6');
        return doctor;
      });
      console.log('doctors inside add-patioent.comp.ts---March-7');
      console.log(this.allDoctors);

      // this.allDoctors = res;
    });
  }

  cancelRegistration() {
    this.dialogRef.close();
  }

  async registerPatient() {
    this.form.value.doctor_name = await this.getDoctorName(
      this.form.value.doctor_id
    );
    this.dialogRef.close(this.form.value);
  }

  getDoctorName(doctorId: string) {
    for (let i = 0; i < this.allDoctors.length; i++) {
      if (this.allDoctors[i].doctor_id == doctorId) {
        return this.allDoctors[i].doctor_name;
      }
    }
    return '';
  }
}
