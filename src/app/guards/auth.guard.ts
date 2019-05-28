import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate(): boolean | UrlTree {
        if (this.authService.isUserLogged()) {
          return true;
        }
        return this.router.parseUrl('/login');
    }

    canLoad(): Observable<boolean> | Promise<boolean> | boolean {
        if (this.authService.isUserLogged()) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}
