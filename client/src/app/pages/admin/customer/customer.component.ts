import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddDoctorComponent } from '../add-doctor/add-doctor.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductService } from '../../../services/product/product.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Doctor } from '../shared/model/doctor';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { DeleteDoctorComponent } from '../delete-doctor/delete-doctor.component';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [
    MatCardModule,
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
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
})
export class CustomerComponent implements OnInit {
  bookList: Doctor[] = [];
  categoryList: any[] = [];
  // displayedColumns: string[] = ['id', 'name', 'progress', 'fruit'];
  displayedColumns: string[] = [
    'bookId',
    'title',
    'description',
    'author',
    'action',
  ];
  // dataSource: MatTableDataSource<UserData>;
  dataSource!: MatTableDataSource<Doctor>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private productSrv: ProductService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllCategory();
    this.getAllBooks();
  }

  addDoctor() {
    // alert('add a doctor bra');
    const dialogConfig = new MatDialogConfig();
    //this one helps us when we click outside of the opened box does not close with true here
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Register a doctor shekh',
      buttonName: 'Register',
    };
    dialogConfig.height = '450px';
    dialogConfig.width = '700px';

    const dialogRef = this.dialog.open(AddDoctorComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        console.log('Register  this doctor for us shex', data);
        this.productSrv.saveBook(data).subscribe((res: any) => {
          if (res) {
            alert('book created kaka-2');
            // this.getAllBooks();
          } else {
            alert('wrong you are kaka');
          }
        });
        this.openSnackBar('done u did it', 'OK MATE');
      }
    });
  }

  editDoctor(row: any) {
    console.log('for update kaka-1');
    console.log(row);
    if (row._id == null) {
      return;
    }
    console.log('for update kaka-2');
    // alert('add a doctor bra');
    const dialogConfig = new MatDialogConfig();
    //this one helps us when we click outside of the opened box does not close with true here
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // dialogConfig.data = { title: 'Register a doctor shekh' };
    dialogConfig.data = row;
    // title of the dialog box
    dialogConfig.data.title = 'Edit doctor';
    dialogConfig.data.buttonName = 'Update';

    // dialogConfig.data.birthdate = row.birthdate.toDate();

    dialogConfig.height = '450px';
    dialogConfig.width = '700px';

    const dialogRef = this.dialog.open(AddDoctorComponent, dialogConfig);
    console.log('for update kaka-3');

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        // console.log('Register  this doctor for us shex', data);
        this.productSrv.updateBook(data).subscribe((res: any) => {
          if (res) {
            alert('book updated kaka-2');
            this.getAllBooks();
          } else {
            alert('wrong you are kaka');
          }
        });
        this.openSnackBar('done u updated a doctor', 'OK MATE');
      }
    });
  }

  deleteDoctor(row: any) {
    // alert('add a doctor bra');
    const dialogConfig = new MatDialogConfig();
    //this one helps us when we click outside of the opened box does not close with true here
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Delete a doctor',
      buttonName: 'Delete',
      author: row.author,
    };
    // dialogConfig.height = '450px';
    // dialogConfig.width = '700px';

    const dialogRef = this.dialog.open(DeleteDoctorComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        console.log('Delete this doctor for us shex', data);
        this.productSrv.deleteBook(row._id).subscribe((res: any) => {
          if (res) {
            alert('book deleted successfully');
            this.getAllBooks();
          } else {
            alert('wrong you are kaka');
          }
        });
        this.openSnackBar('done u deleted it', 'OK MATE');
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  getAllCategory() {
    this.productSrv.getCategory().subscribe((res: any) => {
      console.log('res to see the category inside products.component.ts');
      console.log(res);
      this.categoryList = res;
    });
  }

  getAllBooks() {
    this.productSrv.getBooks().subscribe((res: any) => {
      console.log('res to see the books inside customer.comp.ts');
      console.log(res);
      // this.bookList = res.map((e: any) => {
      //   console.log('test-kaka-0');
      //   const data = e;
      //   console.log(e);
      //   console.log('test-kaka-00');
      //   data.id = e.id;
      //   return data;
      // });
      // data contains the response
      console.log('test-kaka-1');
      this.bookList = res;
      console.log('test-kaka-2');
      console.log(this.bookList);

      //pagination part from material UI
      this.dataSource = new MatTableDataSource(this.bookList);
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

  viewDoctor(row: any) {
    window.open('/customers/' + row._id);
    // window.open('/dashboard/patient/'+row.patient_id,'_blank');
  }
}
