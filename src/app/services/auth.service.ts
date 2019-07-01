import { Injectable, OnDestroy } from '@angular/core';
import { User } from '../core/models';
import { ApiService } from './api.service';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthData, Credentials } from '../auth/models';
import { AppState } from '../store/reducers';
import { Store } from '@ngrx/store';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private api: ApiService, private store: Store<AppState>) { }

    signIn(credentials: Credentials): Observable<AuthData> {
        const headers = new HttpHeaders({
            Authorization: `Basic ${btoa(`${credentials.username}:${credentials.password}`)}`
        });
        return this.api.getRequest('users/login', undefined, headers);
    }

    signUp(credentials: Credentials): Observable<any> {
        return this.api.postRequest('users/signup', credentials)
        .pipe(
            map(res => res.user)
        );
    }

    getSavedToken(): string {
        try {
            return localStorage.getItem('token') || null;
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

    deleteToken(): void {
        try {
            localStorage.removeItem('token');
        } catch (err) {
            console.log(err);
        }
    }

    getCurrentUser(): Observable<User> {
        return this.api.getRequest('users/current');
    }
}
