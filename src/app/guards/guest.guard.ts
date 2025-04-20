import { CanActivateFn, Router  } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { catchError, map, of } from 'rxjs';
import { StorageService } from '../services/storage/storage.service';

export const guestGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const authService = inject(AuthService)
  const storageService = inject(StorageService);
  
  const token = storageService.getItem('token');

  // Si no hay token, dejar pasar directamente
  if (!token) {
    return of(true);
  }
  
  return authService.validateToken(token!).pipe(
    map((res) => {

      console.log("Pasos el guard - guest")

      const { token } = res  
      storageService.setItem('token', token)

      return router.createUrlTree(['/dashboard']);

    }),
    catchError((err) => {
      console.error("Error validando guest", err.error);
      
      const token = storageService.getItem('token')
      if (token) storageService.removeItem('token')
      
      return of(true); 
    })
  )
};
