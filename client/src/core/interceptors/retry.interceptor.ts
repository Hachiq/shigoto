import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { throwError, retry, timer } from "rxjs";

export const retryInterceptor: HttpInterceptorFn = (req, next) => {
  const maxRetries = 5;
  const delayMs = 1000;

  return next(req).pipe(
    retry({
      count: maxRetries,
      delay: (error, retryCount) => {
        if (error instanceof HttpErrorResponse && error.status === 429) {
          console.log(`Retry attempt ${retryCount} after ${delayMs}ms due to 429`);
          return timer(delayMs);
        }
        return throwError(() => error);
      }
    })
  );
};