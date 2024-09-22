import { inject } from "@angular/core";
import { CanActivateChildFn, CanActivateFn, Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { filter, map } from 'rxjs/operators';

export const AuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated$.pipe(
    filter((isAuth) => isAuth !== undefined),
    map((auth) => {
      if (auth) {
        return true;
      } else {
        router.navigate(['/']);
        return false;
      }
    })
  );
};

export const UserProfileGuard: CanActivateChildFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated$.pipe(
    filter((isAuth) => isAuth !== undefined),
    map((auth) => {
      if (auth) {
        return true;
      } else {
        router.navigate(['/']);
        return false;
      }
    })
  );
};
