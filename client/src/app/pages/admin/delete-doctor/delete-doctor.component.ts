import { Component, Inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-doctor',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './delete-doctor.component.html',
  styleUrl: './delete-doctor.component.css',
})
export class DeleteDoctorComponent implements OnInit {
  // define two variable with value undefined!
  doctorName!: string;
  title!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    private dialogRef: MatDialogRef<DeleteDoctorComponent>
  ) {
    this.doctorName = data.author;
    this.title = data.title;
  }
  ngOnInit(): void {}

  close() {
    this.dialogRef.close();
  }

  delete() {
    const deleteDoctor = true;
    this.dialogRef.close(deleteDoctor);
  }
}
