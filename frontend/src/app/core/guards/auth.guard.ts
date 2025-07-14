import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const token = localStorage.getItem('token')
  const router = inject(Router)

  if(!token){
    return router.createUrlTree([''])
  }
  return true;
};

export const authDeGuard : CanActivateFn = () => {
  const token = localStorage.getItem('token')
  const router = inject(Router)

  if(token){
    return router.createUrlTree(['/feed'])
  }
  return true;
}
