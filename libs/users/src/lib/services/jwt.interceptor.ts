import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from './localstorage.service';
import { environment } from '../../environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private localstorageToken: LocalStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.localstorageToken.getToken();
    const isAPIURL = request.url.startsWith(environment.apiURL);

    if(token && isAPIURL){
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      }); 
    }

    return next.handle(request);
  }
}
