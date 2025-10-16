import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from 'src/app/shared/models/product';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private base = '/api/products';
  constructor(private http: HttpClient) {}

  list(): Observable<Product[]> { return this.http.get<Product[]>(this.base); }
  get(id: string): Observable<Product> { return this.http.get<Product>(`${this.base}/${id}`); }
  create(body: Product): Observable<Product> { return this.http.post<Product>(this.base, body); }
  update(id: string, body: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${this.base}/${id}`, body);
  }
  remove(id: string) { return this.http.delete<void>(`${this.base}/${id}`); }

  // Para mock con json-server: devuelve true si hay coincidencias
  existsSku(sku: string): Observable<boolean> {
    const params = new HttpParams().set('sku', sku);
    return this.http.get<Product[]>(this.base, { params }).pipe(map(arr => arr.length > 0));
  }
}
