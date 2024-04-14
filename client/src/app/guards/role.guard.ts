import { CanActivateFn } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
  console.log('route ----March-18');
  console.log(route);
  console.log('route ----March-18--1');
  console.log(route.data['role']);
  const role = route.data['role'];
  if (role === 'ADMIN') {
    return true;
  } else return false;
  // return true;
};
