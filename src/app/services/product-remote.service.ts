import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../models/product';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class ProductRemoteService extends ProductService {
  private readonly url = 'http://localhost:3000/products';

  private readonly httpClient = inject(HttpClient);

  override getById(productId: string): Observable<Product> {
    const url = `${this.url}/${productId}`;
    return this.httpClient.get<Product>(url);
  }

  override getList(name: string | undefined, index: number, size: number): Observable<{ data: Product[]; count: number }> {
    const params = new HttpParams({ fromObject: { _page: index, _per_page: size } });
    return this.httpClient
      .get<{ data: Product[]; items: number }>(this.url, { params })
      .pipe(map(({ data, items: count }) => ({ data, count })));
  }
}
