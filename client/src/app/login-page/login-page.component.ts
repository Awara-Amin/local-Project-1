import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

export interface ILogin {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],

  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  public static ADMIN = 'Admin';

  private baseUrl: string = 'http://localhost:3000';
  menus: any = [];
  role: string = '';
  // hide = true;

  // public userForm!: FormGroup;
  // constructor(private fb: FormBuilder) {
  //   this.userForm = this.fb.group({
  //     email: new FormControl('', [Validators.required, Validators.email]),
  //     password: new FormControl('', [Validators.required]),
  //   });
  // }
  public loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // this is code for the form
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  Login() {
    console.log(this.loginForm.value);
  }

  onSubmit() {
    console.log('inside login-page-component.ts');
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      // alert('Login successfull!');
      this.authService.onLogin(this.loginForm.value).subscribe({
        // next: () => {
        //   const userData = localStorage.getItem('localUserData');
        //   if (userData != null) {
        //     const parseObj = JSON.parse(userData);
        //     console.log('today-16/2---2');
        //     console.log(parseObj);
        //     this.role = parseObj.roles;
        //   }
        //   if (this.role === 'Admin') {
        //     this.router.navigate(['products']);
        //     alert('Login successfull to ptoduct!');
        //   } else
        //     this.router.navigate(['categories']),
        //       alert('Login successfull to home!');
        // },
        next: () => {
          const userData = localStorage.getItem('localUserData');
          if (userData != null) {
            const parseObj = JSON.parse(userData);
            console.log('today-16/2---2');
            console.log(parseObj);
            this.role = parseObj.roles;
          }
          if (
            this.role.toLowerCase() ===
            LoginPageComponent.ADMIN.toLocaleLowerCase()
          ) {
            // this.router.navigateByUrl('categories');
            this.router.navigate(['products']);
            alert('Login successfull to ptoduct!');
          } else
            this.router.navigate(['categories']),
              alert('Login successfull to home!');
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  navigateToRegisterPage() {
    this.router.navigate(['/register']);
  }

  navigateToForgottenPasswordPage() {
    this.router.navigate(['/forgotPassword']);
  }
}
