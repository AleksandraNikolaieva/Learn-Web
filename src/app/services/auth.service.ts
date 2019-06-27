import { Injectable, OnDestroy } from '@angular/core';
import { User } from '../core/models';
import { ApiService } from './api.service';
import { HttpHeaders } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { AuthData, Credentials } from '../auth/models';
import { AppState } from '../store/reducers';
import { State, Store } from '@ngrx/store';
import { SignedIn } from '../auth/store/auth.actions';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isLogged = false;
    private token: string;

    constructor(private api: ApiService, private store: Store<AppState>) { }

    isUserLogged(): boolean {
        if (!this.isLogged && this.isTokenStored()) {
            this.isLogged = true;
            this.getCurrentUser().subscribe((authData: AuthData) => {
                this.store.dispatch(new SignedIn({authData}));
            });
        }
        return this.isLogged;
    }

    getToken(): string {
        return this.token;
    }

    logUser(credentials: Credentials): Observable<AuthData> {
        const headers = new HttpHeaders({
            Authorization: `Basic ${btoa(`${credentials.username}:${credentials.password}`)}`
        });
        return this.api.getRequest('users/login', undefined, headers)
        .pipe(
            tap(res => {
                this.token = res.token;
                this.isLogged = true;
            })
        );
    }

    logOut(): void {
        this.isLogged = false;
        this.deleteToken();
    }

    signUp(credentials: Credentials): Observable<any> {
        return this.api.postRequest('users/signup', credentials)
        .pipe(
            map(res => res.user)
        );
    }

    private getSavedToken(): string {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                return token;
            }
            return null;
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    saveToken(token: string): void {
        try {
            localStorage.setItem('token', token);
        } catch (err) {
            console.log(err);
        }
    }

    private deleteToken(): void {
        try {
            localStorage.removeItem('token');
        } catch (err) {
            console.log(err);
        }
    }

    private isTokenStored(): boolean {
        const token = this.getSavedToken();
        if (token) {
            this.token = token;
            return true;
        }
        return false;
    }

    private getCurrentUser(): Observable<User> {
        return this.api.getRequest('users/current');
    }
}
