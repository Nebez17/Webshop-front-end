import { Injectable } from '@angular/core';
import {JwtPayload} from "../model/jwt.model";
import {jwtDecode} from "jwt-decode";
import {BehaviorSubject, Observable, of} from "rxjs";

const TOKEN = 'l_token';
const USER = 'l_user';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.hasToken());

  constructor() {
    this.isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  }
  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
    this.isLoggedInSubject.next(true);
  }

  public hasToken(): boolean {
    return localStorage.getItem(TOKEN) !== null;
  }

  static getToken(): string {
    return localStorage.getItem(TOKEN);
  }



  static isCustomerLoggedIn(): boolean {
    const tokenJWT = localStorage.getItem(TOKEN); // Use the constant TOKEN
    if (tokenJWT) {
      try {
        const decodedJWT = jwtDecode(tokenJWT) as JwtPayload;
        console.log(decodedJWT);
        return true;
      } catch (error) {
        console.error('Invalid token', error);
        return false;
      }
    } else {
      return false;
    }
  }


  public signOut(): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
    this.isLoggedInSubject.next(false); // Notify about the change in login status
  }
  s
  get isLoggedInObservable(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }
  public isAdmin(): boolean {
    const tokenJWT = localStorage.getItem(TOKEN);
    if (tokenJWT) {
      try {
        const decodedJWT: JwtPayload = jwtDecode(tokenJWT);
        return decodedJWT.role.some(role => role.authority === 'ADMIN');
      } catch (error) {
        console.error('Invalid token', error);
      }
    }
    return false;
  }
}
