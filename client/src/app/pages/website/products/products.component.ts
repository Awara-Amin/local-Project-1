import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
import { ProductService } from '../../../services/product/product.service';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  productList: any[] = [];
  categoryList: any[] = [];

  constructor(private prodSrv: ProductService, private router: Router) {}

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
}
