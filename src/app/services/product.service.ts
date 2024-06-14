import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Options, PaginationParams, Product, Products } from '../../types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private apiService: ApiService) {}

  products: Product[] = [];

  getProducts = (
    url: string,
    params: PaginationParams
  ): Observable<Products> => {
    return this.apiService.get<Products>(url, { params });
  };

  addProduct = (url: string, body: Product): Observable<Product> => {
    return this.apiService.post(url, body, {});
  };

  editProduct = (url: string, body: Product): Observable<Product> => {
    return this.apiService.put(url, body, {});
  };

  deleteProduct(url: string): Observable<void> {
    return this.apiService.delete(url, {});
  }
}
