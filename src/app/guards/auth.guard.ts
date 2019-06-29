import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AppState } from '../store/reducers';
import { Store, select } from '@ngrx/store';
import { selectAuthenticated } from '../auth/store/auth.selectors';
import { take, map, tap, first } from 'rxjs/operators';
import { SignedIn, CurrentUserRequested } from '../auth/store/auth.actions';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router,
        private store: Store<AppState>) {}

    canActivate(): Observable<boolean | UrlTree> {
        return this.store.pipe(
            select(selectAuthenticated),
            take(1),
            map((isLogged: boolean) => {
                if (isLogged) {
                    return true;
                }
                const token  = this.authService.getSavedToken();
                if (token) {
                    this.store.dispatch(new SignedIn({authData: {token}}));
                    this.store.dispatch(new CurrentUserRequested());
                    return true;
                }
                return this.router.parseUrl('/login');
            })
        );
    }

    canLoad(): Observable<boolean> {
        return this.store.pipe(
            select(selectAuthenticated),
            take(1),
            map((isLogged: boolean) => {
                if (isLogged) {
                    return true;
                }
                const token  = this.authService.getSavedToken();
                if (token) {
                    this.store.dispatch(new SignedIn({authData: {token}}));
                    this.store.dispatch(new CurrentUserRequested());
                    return true;
                }
                this.router.navigate(['/login']);
                return false;
            })
        );
    }
}
