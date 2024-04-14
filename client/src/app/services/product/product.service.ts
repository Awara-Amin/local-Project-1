import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from '../constant/constant';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { TokenService } from '../token.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl: string = 'http://localhost:3000';
  books: any = [];
  token: any;

  // getProfile() {
  //   const token = localStorage.getItem('id_token');
  //   console.log(token);
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Authorization': token
  //     })
  //   }
  //   return this.http.get('http://localhost:7777/users/profile', httpOptions)
  //     .pipe(
  //       map(res => res),
  //       catchError(this.handleError),
  //   )
  // }

  //
  // whenever we do api call we need HttpClient
  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) {}

  // getCategory() {
  //   return this.http.get(
  //     // this is the real endPoint> https://freeapi.miniprojectideas.com/api/BigBasket/GetAllCategory
  //     Constant.API_END_POINT + Constant.METHODS.GET_ALL_CATEGORY
  //   );
  // }

  getCategory() {
    const url = `${this.baseUrl}/category`;
    return this.http.get(
      `${url}`
      // this is the real endPoint> https://freeapi.miniprojectideas.com/api/BigBasket/GetAllCategory
      // Constant.API_END_POINT + Constant.METHODS.GET_ALL_CATEGORY
    );
  }

  getBooks() {
    const url = `${this.baseUrl}/books`;
    return this.http.get(
      `${url}`
      // this is the real endPoint> https://freeapi.miniprojectideas.com/api/BigBasket/GetAllCategory
      // Constant.API_END_POINT + Constant.METHODS.GET_ALL_CATEGORY
    );
    // .pipe(
    //   map((response) => {
    //     if (response) {
    //       console.log('response for books');
    //       console.log(response);
    //       // this.tokenService.setToken(response.token);
    //       // this.userId = response.user.id;
    //     }
    //     // return response;
    //     return 'mistak kaka';
    //   })
    // );
  }

  //   // Step 1
  // const httpHeaders: HttpHeaders = new HttpHeaders({
  //   Authorization: 'Bearer JWT-token'
  // });
  // // Step 2
  // this.http.post(url, body, { headers: httpHeaders });

  saveBook(obj: any) {
    console.log(' saveBook inside products.service.ts----3');
    console.log(obj);
    // const headers = new HttpHeaders()
    //   .set('Content-Type', 'application/json; charset=utf-8')
    //   .set('Authorization', `Bearer' ${this.tokenService.getToken()}`);
    this.token = this.tokenService.getToken();
    // Step 1
    const httpHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.token,
    });
    // Step 2
    // this.http.post(url, body, { headers: httpHeaders });
    // const token = this.tokenService.getToken();
    // console.log(token);
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     Authorization: 'token',
    //   }),
    // };
    // let headers = new HttpHeaders({
    //   Authorization: `${this.tokenService.getToken()}`,
    //   'Content-Type': 'application/json',
    // });

    // const token = localStorage.getItem('id_token');
    console.log(' saveBook inside products.service.ts----2');
    // console.log(headers);
    const url = `${this.baseUrl}/books`;
    return this.http.post<any>(`${url}`, obj, {
      responseType: 'json',
      headers: httpHeaders,
      // withCredentials: true,
    });
    // .pipe(
    //   map((response) => {
    //     if (response) {
    //       console.log('response for books');
    //       console.log(response);
    //       // this.tokenService.setToken(response.token);
    //       // this.userId = response.user.id;
    //     }
    //     // return response;
    //     return 'mistak kaka';
    //   })
    // );
  }

  updateBook(obj: any) {
    // updateBook(id: any) {
    console.log(' saveBook inside products.service.ts----3999999');
    console.log(obj);
    // console.log(id);
    this.token = this.tokenService.getToken();
    const httpHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.token,
    });
    console.log(' saveBook inside products.service.ts----2');
    // console.log(headers);
    const url = `${this.baseUrl}/books/`;
    return this.http.put<any>(`${url}` + obj._id, obj, {
      responseType: 'json',
      headers: httpHeaders,
      // withCredentials: true,
    });
  }

  deleteBook(id: any) {
    const url = `${this.baseUrl}/books/`;
    return this.http.delete(`${url}` + id);
    // return this.http.get(`${url}`);
  }

  getDoctorById(id: any) {
    const url = `${this.baseUrl}/books/`;
    return this.http.get(`${url}` + id);
  }
}
