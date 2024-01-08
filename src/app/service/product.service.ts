import {environment} from "../../environments/environment";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/product.model";

@Injectable({ providedIn: 'root' })
export class ProductService {
  private productsUrl = "http://localhost:8081/product";

  constructor(private http: HttpClient) {
  }
  public find(id: string): Observable<Product> {
    const url = `${this.productsUrl}`;
    return this.http.get<Product>(`${url}/${id}`);
  }
  getProducts(categoryId?: string): Observable<Product[]> {
    const url = `${this.productsUrl}`;
    const params: { categoryId?: string } = {};
    if (categoryId) {
      params.categoryId = categoryId;
    }
    return this.http.get<Product[]>(url, { params });
  }

  public addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.productsUrl}`, product);
  }

  public deleteProduct(id: string){
    return this.http.delete<void>(`${this.productsUrl}/${id}`);
  }
  updateProduct(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.productsUrl}/${id}`, product);
  }
}
