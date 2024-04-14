import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
import { ProductsComponent } from '../../pages/admin/products/products.component';

@Component({
  selector: 'app-master',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    HeaderComponent,
    RouterOutlet,
    ProductsComponent,
  ],
  templateUrl: './master.component.html',
  styleUrl: './master.component.scss',
})
export class MasterComponent {}
