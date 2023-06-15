import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Product } from '../models/product';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}
  apiUrl = 'https://localhost:7206/api/';

  getProducts(): Observable<ListResponseModel<Product>> {
    // bu fonksiyon observable'dir ve döncecek verinin tipi:ListResponseModel'dur.
    let newPath = this.apiUrl + 'products/getall';
    return this.httpClient.get<ListResponseModel<Product>>(newPath); // aldigin veriyi ListResponseModel'a göre Map'leyeceksin komutu
  }

  getProductsByCategory(
    categoryId: number
  ): Observable<ListResponseModel<Product>> {
    let newPath = this.apiUrl + 'products/getbycategory?id=' + categoryId;
    // bu fonksiyon observable'dir ve döncecek verinin tipi:ListResponseModel'dur.
    return this.httpClient.get<ListResponseModel<Product>>(newPath); // aldigin veriyi ListResponseModel'a göre Map'leyeceksin komutu
  }
  add(product: Product): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'products/add',
      product
    );
  }
}
