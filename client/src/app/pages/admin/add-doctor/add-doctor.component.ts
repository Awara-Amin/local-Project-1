import { Component, OnInit, Inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ProductService } from '../../../services/product/product.service';
@Component({
  selector: 'app-add-doctor',
  standalone: true,
  imports: [
    CommonModule,
    // BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './add-doctor.component.html',
  styleUrl: './add-doctor.component.css',
})
export class AddDoctorComponent implements OnInit {
  categoryList: any[] = [];
  // form! it means no form first/or undefined
  form!: FormGroup;
  title!: string;
  bookId!: string;
  description!: string;
  author!: string;
  price!: number;
  categoryId!: string;
  // id is need it for editing
  _id!: string;
  buttonName!: string;

  // for the select option part
  // departments: string[] = [
  //   'Orthopedics',
  //   'Cardiology',
  //   'Otoehinology',
  //   'Dentest',
  // ];

  //
  constructor(
    private productSrv: ProductService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: any,
    private dialogRef: MatDialogRef<AddDoctorComponent>
  ) {
    this._id = data._id;
    this.title = data.title;
    this.description = data.description;
    this.author = data.author;
    this.price = data.price;
    this.categoryId = data.categoryId;
    this.buttonName = data.buttonName;
  }
  ngOnInit(): void {
    this.getAllCategory();
    this.form = this.fb.group({
      _id: [this._id, []],
      bookId: ['', []],
      title: [this.title, [Validators.required]],
      description: [
        this.description,
        [Validators.required, Validators.maxLength(15)],
      ],
      author: [this.author, [Validators.required]],
      price: [this.price, []],
      categoryId: [this.categoryId, [Validators.required]],
    });
  }

  getAllCategory() {
    this.productSrv.getCategory().subscribe((res: any) => {
      console.log('res to see the category inside products.component.ts');
      console.log(res);
      this.categoryList = res;
    });
  }

  cancelRegistration() {
    this.dialogRef.close();
  }
  registerDoctor() {
    this.dialogRef.close(this.form.value);
  }
}
