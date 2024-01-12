import {Injectable} from "@angular/core";
import {Product} from "../model/product.model";
import {BehaviorSubject, Observable} from "rxjs";
import {Categorie} from "../model/categorie.model";
import {HttpClient} from "@angular/common/http";
import {User} from "../model/user.model";

@Injectable({ providedIn: 'root' })
export class CategorieService {
  private categorieUrl = "https://irpwcwebshop.online:8081/category";
  private categoriesSubject = new BehaviorSubject<Categorie[]>([]);
  public categories$ = this.categoriesSubject.asObservable();

  constructor(private http: HttpClient) {
  }
  public addCategorie(categorie: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>(`${this.categorieUrl}`, categorie);
  }
  public fetchCategories(): void {
    this.http.get<Categorie[]>(`${this.categorieUrl}`).subscribe(
      categories => {
        this.categoriesSubject.next(categories);
      },
      error => {
        console.error('Error fetching categories:', error);
        // Handle the error appropriately
      }
    );
  }
  public deleteCategory(id: string){
    return this.http.delete<void>(`${this.categorieUrl}/${id}`);
  }

  public updateCategorie(id: string, categorie: Categorie): Observable<Categorie> {
    const url = `${this.categorieUrl}/${id}`;
    console.log('Sending PUT request to:', url);
    console.log('With body:', categorie);
    return this.http.put<Categorie>(url, categorie);
  }
}
