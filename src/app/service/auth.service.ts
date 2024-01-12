import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, map, Observable, catchError, throwError, of } from 'rxjs';
import {UserStorageService} from "./userStorage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  session: any;
  private productsUrl = "https://irpwcwebshop.online:8081/";
  constructor(
    private http: HttpClient,
    private userStorageService: UserStorageService
  ) { }

  login(email: string, password: string): any {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = { email, password };

    return this.http.post(this.productsUrl + 'auth/signin', body, { headers, observe: 'response' }).pipe(
      map((res) => {
        const tokenResponse = res.body;
        if (tokenResponse) {
          this.userStorageService.saveToken(tokenResponse["token"]);
          return true;
        }
        return false;
      }),
      catchError((error) => {
        console.error('Login Error:', error);
        return throwError(error);
      })
    );
  }

}

