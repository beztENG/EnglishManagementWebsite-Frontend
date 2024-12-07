// role.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const expectedRole = next.data['expectedRole']; 
    const token = localStorage.getItem('authToken');

    const userRole = this.getRoleFromToken(token);

    console.log('Expected role:', expectedRole);
    console.log('User role:', userRole);

    if (userRole === expectedRole) {
      return true; 
    } else {
      this.router.navigate(['/access-denied']); 
      return false; 
    }
  }

  private getRoleFromToken(token: string | null): string | null {
    if (!token) return null; 
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.roleId; 
  }
}