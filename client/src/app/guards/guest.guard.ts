import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { inject } from '@angular/core';

export const guestGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  tokenService.isAuthentication.subscribe({
    next: (value) => {
      if (value) {
        console.log('inside guest.guards-March-18-3');
        console.log(value);
        router.navigate(['products']);
        // router.navigate(['home']);
      }
    },
  });

  return true;
};
