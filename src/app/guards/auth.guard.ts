import { CanActivateFn, Router  } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { catchError, map, of } from 'rxjs';
import { StorageService } from '../services/storage/storage.service';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const authService = inject(AuthService)
  const storageService = inject(StorageService);
  
  const token = storageService.getItem('token') || '';
  
  return authService.validateToken(token).pipe(
    map((res) => {

      const { token } = res  
      localStorage.setItem('token', token)
      return true
    }),
    catchError((err) => {
      
      console.error("Error validando auth", err.error);

      const token = storageService.getItem('token')
      if (token) storageService.removeItem('token')
      
      router.navigate(['/']);
      return of(false); 
    })
  )
};



      
