import { inject } from "@angular/core";
import { Router, type CanActivateFn } from "@angular/router";
import { firstValueFrom } from "rxjs";
import { UserService } from "../services/user";
import { UserAuthService } from "../services/user-auth";

export const loginAuthGuard: CanActivateFn = async (route, state) => {
  const _userAuthService = inject(UserAuthService);
  const _userService = inject(UserService);
  const _router = inject(Router);

  const userToken = _userAuthService.getUserToken();

  if (!userToken) {
    return true;
  }

  try {
    await firstValueFrom(_userService.validateUser());

    return _router.navigate(['/products']);
  } catch (err) {
    return true
  }
}