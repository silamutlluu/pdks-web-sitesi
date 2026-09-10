import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '../../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Mock süreçte localStorage'dan token okuma simülasyonu
  // SSR (Server-Side Rendering) sırasında localStorage tanımsızdır, bu yüzden kontrol ekliyoruz.
  let token = null;
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    token = localStorage.getItem('access_token');
  }
  
  let finalReq = req;
  
  // Eğer SSR'da çalışıyorsak ve URL relative ise (ör. /api/...) sunucu tarafı absolute url'ye çevirmelidir.
  if (typeof window === 'undefined' && req.url.startsWith('/')) {
    finalReq = req.clone({
      url: `${environment.apiUrl}${req.url}`
    });
  }

  if (token) {
    const clonedReq = finalReq.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedReq);
  }

  return next(finalReq);
};
