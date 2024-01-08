import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user.model";

@Injectable({ providedIn: 'root' })
export class UserService{
  private userUrl = "http://localhost:8081/user";

  constructor(private http: HttpClient) {
  }
  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.userUrl}`);
  }
}
