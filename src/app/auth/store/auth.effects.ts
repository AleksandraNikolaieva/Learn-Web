import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SignInRequested, AuthActionTypes, SignedIn, SignInFalled, SignedOut } from './auth.actions';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';
import { Credentials, AuthData } from '../models';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private router: Router,
        private authService: AuthService
    ) { }

    @Effect()
    signInRequested$ = this.actions$
    .pipe(
        ofType<SignInRequested>(AuthActionTypes.SignInRequested),
        map((action: SignInRequested ) => action.payload),
        exhaustMap(({credentials, redirectTo}: {credentials: Credentials, redirectTo: string}) => {
            return this.authService.logUser(credentials)
            .pipe(
                map((authData: AuthData) => {
                    console.log(authData);
                    this.authService.saveToken(authData.token);
                    this.router.navigateByUrl(redirectTo || 'workshops/feed');

                    return new SignedIn({authData});
                }),
                catchError(error => {
                    return of(new SignInFalled({error}));
                })
            );
        })
    );

    @Effect({dispatch: false})
    signedOut$ = this.actions$
    .pipe(
        ofType<SignedOut>(AuthActionTypes.SignedOut),
        tap(() => {
            this.authService.logOut();
            this.router.navigate(['/']);
        })
    );
}
