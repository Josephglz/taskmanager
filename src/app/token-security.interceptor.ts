import { HttpInterceptorFn } from '@angular/common/http';

export const tokenSecurityInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  if (token && req.url.includes('/api/tasks')) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
    return next(clonedRequest);
  }
  return next(req);
};
