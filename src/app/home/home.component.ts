import { Component, ViewChild } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product, Products } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { Paginator, PaginatorModule, PaginatorState } from 'primeng/paginator';
import { CommonModule } from '@angular/common';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ProductComponent,
    ButtonModule,
    PaginatorModule,
    EditPopupComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private productService: ProductService) {}
  @ViewChild('paginator') paginator: Paginator | undefined;
  products: Product[] = [];
  total: number = 0;
  rows: number = 5;
  page: number = 0;
  addPopup: boolean = false;
  editPopupVisible: boolean = false;

  selectedProduct: Product = {
    name: '',
    image: '',
    price: '',
    rating: '',
  };

  resetPage() {
    this.paginator?.changePage(0);
  }

  editClicked(product: Product) {
    this.selectedProduct = product;
    this.editPopupVisible = true;
  }
  addProductClicked() {
    this.selectedProduct = {
      name: '',
      image: '',
      price: '',
      rating: '',
    };
    this.addPopup = true;
  }

  deleteClicked(product: Product) {
    if (!product.id) {
      return;
    }
    this.resetPage();
    this.deleteProduct(product.id);
  }

  onConfirm(product: Product) {
    this.editPopupVisible = false;
    if (!this.selectedProduct.id) {
      return;
    }
    this.resetPage();
    this.editProduct(product, this.selectedProduct.id);
  }

  onCancel() {
    this.editPopupVisible = false;
    this.addPopup = false;
  }

  onConfirmAdd(product: Product) {
    this.addProduct(product);
  }

  onPageChange(event: PaginatorState) {
    this.page = event.page!;
    this.fetchProducts(event.page!, event.rows!);
  }

  fetchProducts(page: number, perPage: number) {
    this.productService
      .getProducts('http://localhost:3000/clothes', { page, perPage })
      .subscribe({
        next: (products: Products) => {
          this.products = products.items;
          this.total = products.total;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  addProduct(product: Product) {
    this.productService
      .addProduct('http://localhost:3000/clothes', product)
      .subscribe({
        next: (product: Product) => {
          this.fetchProducts(this.page, this.rows);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  editProduct(product: Product, id: number) {
    this.productService
      .editProduct(`http://localhost:3000/clothes/${id}`, product)
      .subscribe({
        next: (product: Product) => {
          this.fetchProducts(this.page, this.rows);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  deleteProduct(id: number) {
    this.productService
      .deleteProduct(`http://localhost:3000/clothes/${id}`)
      .subscribe({
        next: () => {
          this.fetchProducts(this.page, this.rows);
        },
      });
  }

  ngOnInit() {
    this.fetchProducts(this.page, this.rows);
  }
}
