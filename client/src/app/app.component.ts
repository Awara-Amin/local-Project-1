import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BookStoreService } from './services/book-store.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map, Observable, take } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { BookCardComponent } from './book-card/book-card.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SpinnerComponent } from './spinner/spinner.component';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    BookCardComponent,
    HeaderComponent,
    DashboardComponent,
    // MatProgressSpinnerModule,
    SpinnerComponent,

    // AsyncPipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'client';
  isLoading = true;
  //
  private baseUrl: string = 'http://localhost:3000';
  public bookList: Array<Book> = [];

  // Input decorator
  // @Input() isLoading: boolean = true;

  constructor(private httpClient: HttpClient) {
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }

  public GetAllBooks() {
    const url = `${this.baseUrl}/books`;
    let books: Observable<Book[]> = this.httpClient.get(url) as Observable<
      Book[]
    >;
    books.pipe(take(1)).subscribe((res) => {
      this.bookList = res;
    });
  }
}
