import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "./auth.service";
import { from, switchMap } from "rxjs";

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const authService = inject(AuthService);
  
  return from(authService.getAuthorizationHeaders()).pipe(
    switchMap(headers => {
      const newReq = req.clone({
        setHeaders: headers,
      });
      return next(newReq);
    })
  );
}