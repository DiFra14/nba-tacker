import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'environments/environment';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const requestClone = request.clone({
      headers: new HttpHeaders({
        'X-RapidAPI-Key': environment.rapidApiKey,
        'X-RapidAPI-Host': environment.rapidHost
      })
    });
    return next.handle(requestClone);
  }
}
