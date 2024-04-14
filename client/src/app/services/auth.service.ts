import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { ILogin, ILoginResponse } from '../models/auth.mode';
// import { apiEndpoint } from '../constants/constants';
import { map, Observable } from 'rxjs';
import { TokenService } from './token.service';

export interface IUser {
  id: string;
  name: string;
  email: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  name: string;
  email: string;
  password: string;
  roles: string;
}
export interface IForgotPassword {
  email: string;
}
export interface ILoginResponse {
  message: string;
  token: string;
  user: IUser;
}

export interface IRegisterResponse {
  message: string;
  // token: string;
  user: IUser;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = 'http://localhost:3000';
  user: any = {};
  public userId: any;

  //
  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) {}

  onLogin(data: ILogin) {
    const url = `${this.baseUrl}/auth/login`;
    return this.http.post<ILoginResponse>(`${url}`, data).pipe(
      map((response) => {
        if (response) {
          this.tokenService.setToken(response.token);
          this.userId = response.user.id;
          console.log('today-16/2---1');
          localStorage.setItem('localUserData', JSON.stringify(response.user));
        }
        return response;
      })
    );
  }

  getUser(userId: any) {
    const url = `${this.baseUrl}/auth/user/${userId}`;
    return this.http.get<ILoginResponse>(`${url}`).subscribe((res: any) => {
      this.user = res.data.name;
    });
  }

  onLogout() {
    this.tokenService.removeToken();
    console.log('today to clear localStorage-16/2---3');
    localStorage.removeItem('localUserData');
    // this.router.navigate(['']);
    // const url = `${this.baseUrl}/auth/logout`;
    // this.http.post(`${url}`, '').subscribe({
    //   next: (response) => {
    //     this.tokenService.removeToken();
    //   },
    // });
  }

  onRegister(data: IRegister) {
    const url = `${this.baseUrl}/auth/signup`;
    return this.http.post<IRegisterResponse>(`${url}`, data).pipe(
      map((response) => {
        if (response) {
          // this.tokenService.setToken(response.token);
          this.user = response.user;
          console.log('today-March---12---1');
          console.log(response);
          // localStorage.setItem('localUserData', JSON.stringify(response.user));
        }
        return response;
      })
    );
  }

  forgetPassword(data: IForgotPassword) {
    const url = `${this.baseUrl}/auth/forgotPassword`;
    return this.http.post<IForgotPassword>(`${url}`, data).pipe(
      map((response) => {
        if (response) {
          // this.tokenService.setToken(response.token);
          this.user = response.email;
          console.log('today-March---15---4');
          console.log(response);
          // localStorage.setItem('localUserData', JSON.stringify(response.user));
        }
        return response;
      })
    );
  }
}
