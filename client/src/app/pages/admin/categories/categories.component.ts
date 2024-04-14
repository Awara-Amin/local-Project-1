import { Component } from '@angular/core';
import { CategoryService } from '../../../services/category/category.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {  MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';

import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatListModule,
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  categoryObj: any = {
    name: 0,
    icon: '',
    color: '',
  };

  categoryList: any[] = [];
  //minute 1:18 he used observable and pipe for population!!!
  // categories$:Observable<any>
  // constructor(private categorySrv: CategoryService) {}
  constructor(private categorySrv: CategoryService) {
    // this.categories$ = this.categorySrv.getCategory()
  }

  ngOnInit(): void {
    this.getAllCategories();
    console.log('this.categoryList-1');
    console.log(this.categoryList);
  }

  getAllCategories() {
    this.categorySrv.getCategory().subscribe((res: any) => {
      console.log('res to see the categories inside categories.comp.ts');
      console.log(res);
      // data contains the response
      this.categoryList = res;
    });
  }
}
