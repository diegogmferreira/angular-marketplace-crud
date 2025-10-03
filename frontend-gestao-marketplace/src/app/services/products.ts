import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly _httpClient = inject(HttpClient);

  saveProduct(product: INewProductRequest): Observable<INewProductResponse> {
    return this._httpClient.post<INewProductResponse>(`${environment.apiUrl}/products`, product);
  }

  getProducts(): Observable<IProductsResponse> {
    return this._httpClient.get<IProductsResponse>(`${environment.apiUrl}/products`);
  }
} 