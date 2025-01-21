import { CanActivateFn, Router } from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {
  const router = new Router();
  const token = localStorage.getItem('token');

  if (!token || token.length === 0) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
