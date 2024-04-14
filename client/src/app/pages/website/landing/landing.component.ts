import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product/product.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent implements OnInit {
  //define this variable
  productList: any[] = [];
  categoryList: any[] = [];
  constructor(private prodSrv: ProductService) {}

  //
  ngOnInit(): void {
    this.getAllBooks();
    this.getAllGategories();
    console.log('hi from frontend-fffffffff-1');
    console.log(this.productList);
  }

  getAllBooks() {
    this.prodSrv.getBooks().subscribe((res: any) => {
      console.log('hi from frontend-fffffffff-2');
      console.log(res);
      this.productList = res;
    });
  }

  getAllGategories() {
    this.prodSrv.getCategory().subscribe((res: any) => {
      // console.log('hi from frontend-fffffffff-2');
      // console.log(res);
      this.categoryList = res;
    });
  }
}
