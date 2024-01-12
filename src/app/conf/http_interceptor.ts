import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserStorageService} from "../service/userStorage.service";

@Injectable()
export class ApiHeadersInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // List of URLs that don't require a JWT token
    const openUrls = ['https://irpwcwebshop.online:8081/product',
      'https://irpwcwebshop.online:8081/signup'];

    // Check if the request URL is not in the openUrls list
    if (!openUrls.includes(req.url)) {
      // If not in openUrls, add the Authorization header
      const authToken = UserStorageService.getToken(); // Static method call
      if (authToken) {
        const authReq = req.clone({
          setHeaders: { Authorization: `Bearer ${authToken}` }
        });
        return next.handle(authReq);
      }
    }

    // For openUrls, pass the request without modifying it
    return next.handle(req);
  }
}
