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

  logout() {
    this.userStorageService.signOut();
    this.session = undefined;
    // redirect to landing page
  }

  register(signupRequest: any): Observable<any> {
    return this.http.post(this.productsUrl + "signup", signupRequest);
  }



  getOrderByTrackingId(trackingId: number): Observable<any> {
    return this.http.get<[]>(`${this.productsUrl}order/${trackingId}`)
      .pipe(
        tap((_) => this.log('Order fetched successfully')),
        catchError(this.handleError<[]>('Error getting Order', []))
      );
  }

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization',
      'Bearer ' + UserStorageService.getToken()
    );
  }

  private log(message: string): void {
    console.log(`User Auth Service: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

