import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from '../token.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl: string = 'http://localhost:3000';
  categories: any = [];
  token: any;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) {}

  getCategory() {
    const url = `${this.baseUrl}/category`;
    return this.http.get(
      `${url}`
      // this is the real endPoint> https://freeapi.miniprojectideas.com/api/BigBasket/GetAllCategory
      // Constant.API_END_POINT + Constant.METHODS.GET_ALL_CATEGORY
    );
  }
}
