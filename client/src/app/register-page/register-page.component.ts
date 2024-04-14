import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar/snackbar.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerComponent } from '../spinner/spinner.component';

//
export interface IRegister {
  name: string;
  email: string;
  password: string;
  roles: string;
}

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    SpinnerComponent,
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent {
  // all backend API run on 3000 port, so with this baseURL we get connecetd to the backend!
  private baseUrl: string = 'http://localhost:3000';
  menus: any = [];
  password = true;
  confirmPassword = true;
  responseMessage: any;
  isLoading = false;

  public registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {
    this.registerForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      roles: 'Admin',
    });
    // setTimeout(() => {
    //   this.isLoading = false;
    // }, 3000);
  }

  validateSubmit() {
    console.log('inside register-page-component.ts-March-14-1');
    console.log(this.registerForm.value);
    console.log('inside register-page-component.ts-March-14-2');
    console.log(this.registerForm.controls);
    if (
      this.registerForm.controls['password'].value !=
      this.registerForm.controls['confirmPassword'].value
    ) {
      // here then to disable the button
      return true;
    } else {
      // here then to enable the button
      return false;
    }
  }

  onSubmit() {
    this.isLoading = true;
    if (this.registerForm.valid) {
      this.authService.onRegister(this.registerForm.value).subscribe(
        (res: any) => {
          console.log('inside register-page-component.ts-March-14-3');
          console.log(res);
          this.isLoading = false;
          this.router.navigate(['login']);
          // this is if we navigate to the same page :)
          // this.router.navigate(['/']);
          this.snackbarService.openSnackBar(
            'Registration is done successfully',
            ''
          );
        },
        (error) => {
          console.log(error);
        }
        //   {
        //   next: () => {
        //     this.isLoading = false;
        //     this.router.navigate(['login']);
        //     alert('Register successfully!');
        //     this.snackbarService.openSnackBar(
        //       'Registration done successfully',
        //       ''
        //     );
        //   },
        // }
      );
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
