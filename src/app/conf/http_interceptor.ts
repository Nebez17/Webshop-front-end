import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CustomerInterceptorInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isAuthenticationRequest: boolean = request.url.endsWith('/signup');
    const isRegister: boolean = request.url.endsWith('/auth/register');
    const getProduct: boolean = request.url.endsWith('/product');
    const getCategory: boolean = request.url.endsWith('/category');



    if (!isAuthenticationRequest && !getProduct && !isRegister  && !getCategory ) {
      const token: string = localStorage.getItem('loginToken') ?? '';
      const newCloneRequest: HttpRequest<any> = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(newCloneRequest);
    }
    return next.handle(request);
  }
}
