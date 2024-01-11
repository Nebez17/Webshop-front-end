import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user.model";
import {Product} from "../model/product.model";

@Injectable({ providedIn: 'root' })
export class UserService{
  private userSignUrl = "http://localhost:8081/signup";
  private userUrl = "http://localhost:8081/user";


  constructor(private http: HttpClient) {
  }
  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.userUrl}`);
  }
  public addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.userSignUrl}`, user);
  }
  public deleteUser(id: string){
    return this.http.delete<void>(`${this.userUrl}/${id}`);
  }
}
