import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoginPageComponent } from '../login-page/login-page.component';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { catchError, map, Observable, take, tap } from 'rxjs';
import { ProductService } from '../services/product/product.service';

export interface User {
  id: string;
  name: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    LoginPageComponent,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  categoryList: any[] = [];
  isAuthenticated$;
  private baseUrl: string = 'http://localhost:3000';

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService,
    private authService: AuthService,
    public dialog: MatDialog,
    private prodSrv: ProductService,
    private router: Router
  ) {
    this.isAuthenticated$ = this.tokenService.isAuthentication;
  }

  ngOnInit(): void {
    console.log('hi from frontend-fffffffff-inside header-5');
    this.getAllGategories();
  }

  getAllGategories() {
    this.prodSrv.getCategory().subscribe((res: any) => {
      console.log('hi from frontend-fffffffff-inside header-4');
      // console.log(res);
      this.categoryList = res;
    });
  }

  //
  navigateToProducts(id: number) {
    this.router.navigate(['/products', id]);
  }
  onLogout() {
    this.authService.onLogout();

    // constructor(public dialog: MatDialog) {}

    // openDialog(
    //   enterAnimationDuration: string,
    //   exitAnimationDuration: string
    // ): void {
    //   this.dialog.open(LoginPageComponent, {
    //     width: '600px',
    //     height: '600',
    //     enterAnimationDuration,
    //     exitAnimationDuration,
    //   });
  }
}
