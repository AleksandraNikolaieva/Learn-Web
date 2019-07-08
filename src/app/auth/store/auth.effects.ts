import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {
    SignInRequested,
    AuthActionTypes,
    SignedIn,
    SignInFalled,
    SignedOut,
    SignUpRequested,
    SignUpFalled,
    CurrentUserRequested,
    CurrentUserRequestFalled,
    ChangeUserInfoRequested,
    ChangeUserInfoFalled,
    UserInfoUpdated} from './auth.actions';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';
import { Credentials, AuthData } from '../models';
import { of } from 'rxjs';
import { UserParams, User } from 'src/app/core/models';
import { UsersService } from 'src/app/services/users.service';
import { ToastService } from 'src/app/core/toast-message/toast.service';

@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private router: Router,
        private authService: AuthService,
        private userService: UsersService,
        private toast: ToastService
    ) { }

    @Effect()
    signInRequested$ = this.actions$
    .pipe(
        ofType<SignInRequested>(AuthActionTypes.SignInRequested),
        map((action: SignInRequested ) => action.payload),
        exhaustMap(({credentials, redirectTo}: {credentials: Credentials, redirectTo: string}) => {
            return this.authService.signIn(credentials)
            .pipe(
                map((authData: AuthData) => {
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
            this.authService.deleteToken();
            this.router.navigate(['/']);
        })
    );

    @Effect()
    signUpRequested$ = this.actions$
    .pipe(
        ofType<SignUpRequested>(AuthActionTypes.SignUpRequested),
        map((action: SignUpRequested) => action.payload),
        exhaustMap(({credentials}: {credentials: Credentials}) => {
            return this.authService.signUp(credentials)
            .pipe(
                map((authData: AuthData) => {
                    return new SignInRequested({credentials});
                }),
                catchError(error => {
                    return of(new SignUpFalled({error}));
                })
            );
        })
    );

    @Effect()
    currentUserRequested$ = this.actions$
    .pipe(
        ofType<CurrentUserRequested>(AuthActionTypes.CurrentUserRequested),
        exhaustMap(() => {
            return this.authService.getCurrentUser()
            .pipe(
                map((user: User) => {
                    return new UserInfoUpdated({updatedInfo: user});
                }),
                catchError(error => {
                    return of(new CurrentUserRequestFalled({error}));
                })
            );
        })
    );

    @Effect()
    changeUserInfoRequested$ = this.actions$
    .pipe(
        ofType<ChangeUserInfoRequested>(AuthActionTypes.ChangeUserInfoRequested),
        map((action: ChangeUserInfoRequested) => action.payload),
        exhaustMap(({newInfo, id}: {newInfo: UserParams, id: string}) => {
            return this.userService.updateUser(id, newInfo)
            .pipe(
                map((updatedInfo: AuthData) => {
                    this.toast.show({type: 'info', text: 'Profile updeted'});
                    return new UserInfoUpdated({updatedInfo});
                }),
                catchError(error => {
                    this.toast.show({type: 'error', text: 'Something gone wrong'});
                    return of(new ChangeUserInfoFalled({error}));
                })
            );
        })
    );
}
