import { inject } from "@angular/core";
import { Router, type CanActivateFn } from "@angular/router";
import { firstValueFrom } from "rxjs";
import { UserService } from "../services/user";
import { UserAuthService } from "../services/user-auth";

export const authGuard: CanActivateFn = async (route, state) => {
  const _userService = inject(UserService);
  const _userAuthService = inject(UserAuthService);

  const _router = inject(Router);

  const token = _userAuthService.getUserToken();

  if (!token) {
    return _router.navigate(['/login']);
  }

  try {
    await firstValueFrom(_userService.validateUser());

    if (state.url === '/login') {
      return _router.navigate(['/products']);
    }

    return true;
  } catch (error) {
    return _router.navigate(['/login']);
  }
}