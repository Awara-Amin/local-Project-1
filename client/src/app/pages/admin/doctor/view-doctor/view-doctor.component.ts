import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../../services/product/product.service';
//
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogConfig,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { PatientService } from '../../../../services/patient/patient.service';
import { Patient } from '../../shared/model/patient';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AddPatientComponent } from '../../patient/add-patient/add-patient.component';

@Component({
  selector: 'app-view-doctor',
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatMenuModule,
  ],
  templateUrl: './view-doctor.component.html',
  styleUrl: './view-doctor.component.css',
})
export class ViewDoctorComponent implements OnInit {
  id!: any;
  doctorObj!: any;
  allPatients: Patient[] = [];

  title!: string;

  buttonName!: string;

  displayedColumns: string[] = [
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
    private route: ActivatedRoute,
    private productSrv: ProductService,
    private patientSrv: PatientService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar // private dialogRef: MatDialogRef<AddPatientComponent> // @Inject(MAT_DIALOG_DATA) data: any,
  ) {
    this.id = route.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    this.getDoctorById();
    this.getAllPatientsForDoctor();
  }

  getDoctorById() {
    this.productSrv.getDoctorById(this.id).subscribe((res) => {
      console.log(res);
      this.doctorObj = res;
    });
  }

  //
  getAllPatientsForDoctor() {
    this.patientSrv.getAllPatients().subscribe((res: any) => {
      this.allPatients = res.map((e: any) => {
        const data = e;
        console.log('this.allPatients====March-8-2');
        console.log(data._id);
        console.log(e._id);
        // data._id = e._id;
        // here we check each patient to see if the doctor_id inside them === to the id of the doctor we have clicked on!
        if (data.doctor_id == this.id) {
          data._id = e._id;
          return data;
        }
      });
      console.log('this.allPatients====March-8-3');
      console.log(this.allPatients);

      this.allPatients = this.allPatients.filter((item) => item != undefined);
      this.dataSource = new MatTableDataSource(this.allPatients);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  viewPatient(row: any) {
    console.log('March-8-111111111');
    window.open('/patients/' + row._id);
  }
  editPatient(row: any) {
    console.log('March-9-4');
    if (row._id == null) {
      return;
    }
    console.log('March-9-5');
    console.log(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = row;
    dialogConfig.data.title = 'edite Patient';
    dialogConfig.data.buttonName = 'Update';
    dialogConfig.height = '450px';
    dialogConfig.width = '700px';
    console.log('March-9-6');
    console.log(dialogConfig.data);
    const dialogRef = this.dialog.open(AddPatientComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.patientSrv.updatePatient(data).subscribe((res: any) => {
          if (res) {
            alert('book created kaka-2');
            // this.getAllBooks();
            this.getAllPatientsForDoctor();
          } else {
            alert('wrong you are kaka');
          }
        });
        this.openSnackBar('done u did it', 'OK MATE');
      }
      // if (data) {
      //   console.log('Edit this patient March-10-1', data);
      //   this.openSnackBar('done u did it', 'OK MATE-March-10-2');
      // }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  //
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
