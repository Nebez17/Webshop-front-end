import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {User} from "../model/user.model";
import {Product} from "../model/product.model";

@Injectable({ providedIn: 'root' })
export class UserService{
  private userSignUrl = "http://localhost:8081/signup";
  private userUrl = "http://localhost:8081/user";
  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();

  constructor(private http: HttpClient) {
  }
  public fetchUsers(): void {
    this.http.get<User[]>(`${this.userUrl}`).subscribe(users => {
      this.usersSubject.next(users);
    });
  }
  public addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.userSignUrl}`, user);
  }
  public deleteUser(id: string) {
    return this.http.delete<void>(`${this.userUrl}/${id}`).pipe(
      tap(() => {
        this.fetchUsers(); // Re-fetch the users after deletion
      })
    );
  }
 public updateProduct(email: string, user: User): Observable<User> {
   return this.http.put<User>(`${this.userUrl}/${email}`, user);
 }
}
