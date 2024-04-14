import { CommonModule } from '@angular/common';
// onInit helps runing functions we want
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  // commonModel is to allow us to use ng like ngif, ngClass and other ng s inside produuct.component.html
  // FormsModel is to allow us to use [(ngModel)] inside produuct.component.html
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})

// export class ProductsComponent  {
export class ProductsComponent implements OnInit {
  console = console;
  // this is variable (boolean) kaka, it is used inside products.components.html
  isSidePanelVisible: boolean = true;

  // another variable but object type
  productObj: any = {
    productId: 0,
    productSku: '',
    productName: '',
    productPrice: 0,
    productShortName: '',
    productDescription: '',
    createdDate: new Date(),
    deliveryTimeSpan: '',
    categoryId: 0,
    productImageUrl: '',
  };
  bookObj: any = {
    bookId: 0,
    title: '',
    description: '',
    author: '',
    price: '',
    categoryId: 0,
    // category: '',
  };

  //for the data we get from the backend via services
  categoryList: any[] = [];
  bookList: any[] = [];

  //NOTE FIRST viarables then contructor , that is the sequennce
  // via constructor now we call the ProductService you created inside services/product
  constructor(private productSrv: ProductService) {}

  //ngOnInit runs directly after angular has initialized, so it runs what is in it
  ngOnInit(): void {
    this.getAllCategory();
    console.log('this.categoryList');
    console.log(this.categoryList);
    this.getAllBooks();
    console.log('this.bookList');
    console.log(this.bookList);
    console.log('bookObj.bookId--------22');
    console.log(this.bookObj);
    console.log(this.bookObj.bookId);
  }

  //get the category from the service
  // getAllCategory() {
  //   this.productSrv.getCategory().subscribe((res: any) => {
  //     console.log('res to see the category');
  //     console.log(res);
  //     this.categoryList = res.data;
  //   });
  // }

  getAllCategory() {
    this.productSrv.getCategory().subscribe((res: any) => {
      console.log('res to see the category inside products.component.ts');
      console.log(res);
      this.categoryList = res;
    });
  }

  getAllBooks() {
    this.productSrv.getBooks().subscribe((res: any) => {
      console.log('res to see the books inside products.comp.ts');
      console.log(res);
      // data contains the response
      this.bookList = res;
    });
  }

  //
  onSave() {
    alert('book created kaka-1');
    // const token = localStorage.getItem('id_token');
    console.log(' CREATE inside products.component.ts----1');
    // console.log(token);
    this.productSrv.saveBook(this.bookObj).subscribe((res: any) => {
      if (res) {
        alert('book created kaka-2');
        this.getAllBooks();
      } else {
        alert('wrong you are kaka');
      }
    });
  }

  onUpdate(item: any) {
    alert('are u updateing a book?');
    // const token = localStorage.getItem('id_token');
    console.log(' UPDATE inside products.component.ts----19999999');
    console.log(item);
    // this.productSrv.updateBook(this.bookObj).subscribe((res: any) => {
    this.productSrv.updateBook(item).subscribe((res: any) => {
      if (res) {
        alert('book updated kaka-2');
        this.getAllBooks();
      } else {
        alert('update is wrong  kaka');
      }
    });
  }

  //edit a product/book
  onEdit(item: any) {
    alert('do you want to edit this product?');
    // this how data of the clicked one goes in to the fileds WOW!
    this.bookObj = item;
    this.openSidePanel();
  }

  // a function to open
  openSidePanel() {
    this.isSidePanelVisible = true;
  }

  // a function to close
  closeSidePanel() {
    this.isSidePanelVisible = false;
  }

  //edit a product/book
  onDelete(item: any) {
    // alert('Are u sure you want to delete this?');
    const isDelete = confirm('Are you sure you want to delete it?');
    console.log(' DELETE inside products.component.ts----111111-2');
    console.log(item);
    if (isDelete) {
      this.productSrv.deleteBook(item._id).subscribe((res: any) => {
        if (res) {
          alert('book deleted kaka-2');
          this.getAllBooks();
        } else {
          alert('delete is wrong kaka');
        }
      });
    }

    this.bookObj = item;
  }
}
