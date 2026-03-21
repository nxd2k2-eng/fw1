import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = () => {
  const auth       = inject(AuthService);
  const router     = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) return true;
  if (!auth.isLoggedIn) { router.navigate(['/login']); return false; }
  return true;
};

export const employeeGuard: CanActivateFn = () => {
  const auth       = inject(AuthService);
  const router     = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) return true;
  if (!auth.isLoggedIn)                         { router.navigate(['/login']); return false; }
  if (auth.currentUser?.role === 'team_leader') { router.navigate(['/admin/dashboard']); return false; }
  return true;
};