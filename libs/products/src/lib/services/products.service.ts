import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  apiURLProducts = environment.apiURL + 'products';
  constructor(private http: HttpClient) {
  }

  getProducts(categoriesFilter?: string[]): Observable<Product[]>{
    let params = new HttpParams();
    if(categoriesFilter){
      params = params.append('categories', categoriesFilter.join(','))
    }
    return this.http.get<Product[]>(this.apiURLProducts, { params: params })
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

  getProductCount(): Observable<number>{
    return this.http.get<number>(`${this.apiURLProducts}/get/count`);
  }

  getFeaturedProducts(count:number): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiURLProducts}/get/featured/${count}`);
  }
}
