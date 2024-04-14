import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent implements OnInit {
  public forgotPasswordForm!: FormGroup;
  responseMessage: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // this.loginForm = this.fb.group({
    //   email: new FormControl('', [Validators.required, Validators.email]),
    //   password: new FormControl('', [Validators.required]),
    // });
  }

  ngOnInit(): void {
    console.log('March-15-1');
    this.forgotPasswordForm = this.fb.group({
      email: [null, [Validators.required]],
    });
  }

  handleSubmit() {
    console.log('inside forgotten-password-page-component.ts-March-15-2');
    console.log(this.forgotPasswordForm.value);
    var formData = this.forgotPasswordForm.value;
    var data = {
      email: formData.email,
    };
    this.authService.forgetPassword(data).subscribe((response: any) => {
      console.log('inside forgotten-password-page-component.ts-March-15-3');
      console.log(response);
    });
  }
}
