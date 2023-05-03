import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  apiURLProducts = environment.apiURL + 'products';
  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.apiURLProducts)
  }

  getProduct(productId: string): Observable<Product>{
    return this.http.get<Product>(`${this.apiURLProducts}/${productId}`)
  }
  
  createProduct(productData: FormData): Observable<Product>{
    return this.http.post<Product>(this.apiURLProducts, productData)
  }

  deleteProduct(productId: string): Observable<object>{
    return this.http.delete<object>(`${this.apiURLProducts}/${productId}`)
  }

  updateProduct(productData: FormData, productId: string): Observable<Product>{
    return this.http.put<Product>(`${this.apiURLProducts}/${productId}`, productData)
  }
}
