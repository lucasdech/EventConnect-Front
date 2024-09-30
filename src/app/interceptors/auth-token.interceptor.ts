import { HttpInterceptorFn } from '@angular/common/http';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('JWT'); // Assure-toi que le nom correspond

  let requestToSend = req;
  if (token) {
    const headers = req.headers.set('Authorization', 'Bearer ' + token); // Ajoute "Bearer" avant le token
    requestToSend = req.clone({
      headers: headers
    });
  }

  return next(requestToSend);
};
