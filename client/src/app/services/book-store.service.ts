import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Book {
  id: string;
  title: string;
  description: string;
  author: string;
  price: number;
  category: string;
  user: string;
  createdAt: string;
  updatedAt: string;
}
@Injectable({
  providedIn: 'root',
})
export class BookStoreService {
  private baseUrl: string = 'http://localhost:3000';
  constructor(private httpClient: HttpClient) {}
  // public GetAllBooks(): Observable<Book[]> {
  //   const url = `${this.baseUrl}/books`;
  //   let books: Observable<Book[]> = this.httpClient.get(url) as Observable<
  //     Book[]
  //   >;
  //   return books;
  // }
}
