import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user.model";
import {Product} from "../model/product.model";

@Injectable({ providedIn: 'root' })
export class UserService{
  private userUrl = "http://localhost:8081/signup";

  constructor(private http: HttpClient) {
  }
  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.userUrl}`);
  }
  public addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.userUrl}`, user);
  }
}
