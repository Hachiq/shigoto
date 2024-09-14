import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { from, Observable, switchMap } from "rxjs";

// TODO: Consider using functional interceptor https://angular.dev/guide/http/interceptors
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.authService.getAuthorizationHeaders()).pipe(
      switchMap(headers => next.handle(req.clone({ setHeaders: headers })))
    );
  }
}