import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { environment } from "../../environments/environment";

export function withCredentialsInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const shouldAddCredentials = req.url.includes(environment.apiUrl);

  if (shouldAddCredentials) {
    req = req.clone({
      withCredentials: true
    });
  }

  return next(req);
}