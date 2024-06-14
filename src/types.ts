import { HttpHeaders, HttpContext, HttpParams } from '@angular/common/http';

export interface Options {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  context?: HttpContext;
  observe?: 'body';
  params?:
    | HttpParams
    | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  transferCache?:
    | {
        includeHeaders?: string[];
      }
    | boolean;
}

export interface Product {
  id?: number;
  name: string;
  image: string;
  price: string;
  rating: string;
}

export interface Products {
  items: Product[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export interface PaginationParams {
  [params: string]:
    | string
    | number
    | boolean
    | ReadonlyArray<string | number | boolean>;
  page: number;
  perPage: number;
}
