import { HttpHandlerFn, HttpRequest } from "@angular/common/http";

export function withCredentialsInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  req = req.clone({
    withCredentials: true
  });

  return next(req);
}