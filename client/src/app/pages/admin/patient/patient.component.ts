import { Component, OnInit, ViewChild } from '@angular/core';
import { PatientService } from '../../../services/patient/patient.service';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Patient } from '../shared/model/patient';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { MatMenuModule } from '@angular/material/menu';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Doctor } from '../shared/model/doctor';
import { ProductService } from '../../../services/product/product.service';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [
    MatDialogModule,
    MatIconModule,
    MatCardModule,
    MatPaginatorModule,
    MatMenuModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
  ],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css',
})
export class PatientComponent implements OnInit {
  allPatients: any[] = [];
  allDoctors: Doctor[] = [];
  displayedColumns: string[] = [
    'doctor_id',
    'name',
    'phoneNo',
    'gender',
    'age',
    'address',
    'action',
  ];
  dataSource!: MatTableDataSource<Patient>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private patientSrv: PatientService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private productSrv: ProductService
  ) {}

  ngOnInit(): void {
    console.log('this.dataSource---March-6-3');
    console.log(this.dataSource);
    this.getAllPatients();
    this.getAllBooks();
  }

  addPatient() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Register Patient',
      buttonName: 'Register',
    };
    dialogConfig.height = '450px';
    dialogConfig.width = '700px';

    const dialogRef = this.dialog.open(AddPatientComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        console.log('Register patient--March-4', data);
        this.patientSrv.savePatient(data).subscribe((res: any) => {
          if (res) {
            alert('book created kaka-2');
            // this.getAllBooks();
          } else {
            alert('wrong you are kaka');
          }
        });
        this.openSnackBar('Registration of patient successfull', 'OK');
      }
    });
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  getAllPatients() {
    this.patientSrv.getAllPatients().subscribe((res: any) => {
      console.log('get allPatients inside patient.com---March-6-1');
      console.log(res.length);
      this.allPatients = res.map((e: any) => {
        const data = e;
        data._id = e._id;
        console.log('get allPatients inside patient.com---March-6-2');
        console.log(data);
        return data;
      });

      this.dataSource = new MatTableDataSource(this.allPatients);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  //
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewPatient(row: any) {}
  editPatient(row: any) {}
  deletePatient(row: any) {}

  //this is get all doctors for me :)
  getAllBooks() {
    this.productSrv.getBooks().subscribe((res: any) => {
      console.log('res to see the books inside customer.comp.ts');
      console.log(res);
      this.allDoctors = res.map((e: any) => {
        console.log('test-kaka-March-777-1');
        const data = e;
        console.log(e);
        console.log('test-kaka-00-March-777-2');
        data.id = e.id;
        return data;
      });
      // data contains the response
      // console.log('test-kaka-1');
      // this.bookList = res;
      // console.log('test-kaka-2');
      // console.log(this.bookList);

      //pagination part from material UI
      // this.dataSource = new MatTableDataSource(this.bookList);
      // this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
    });
  }

  // here we get doctor name from id!
  gotDoctorName(id: string) {
    // console.log('id--March-7-3');
    // console.log(id);
    //we iterate over the all doctors array to get the doctor name we want
    let doctorName = '';
    this.allDoctors.forEach((element) => {
      // console.log('id--March-7-4');
      // console.log(element);
      // console.log(element._id);
      if (element._id == id) {
        doctorName = element.author;
      }
    });
    return doctorName;
  }
}
