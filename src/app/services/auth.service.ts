import { Injectable, OnDestroy } from '@angular/core';
import { User } from '../core/models';
import { ApiService } from './api.service';
import { HttpHeaders } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isLogged = false;
    private loggedUserSubj$ = new BehaviorSubject<User>(null);
    private token: string;

    constructor(private api: ApiService) { }

    public isUserLogged(): boolean {
        if (this.isTokenStored()) {
            this.getCurrentUser().subscribe(res => {
                this.loggedUserSubj$.next(res);
            });
        }
        return this.isLogged;
    }

    public getLoggedUserObs(): Observable<User> {
        return this.loggedUserSubj$.asObservable();
    }

    public getToken(): string {
        return this.token;
    }

    public logUser(userName: string, password: string): Observable<User> {
        const headers = new HttpHeaders({
            Authorization: `Basic ${btoa(`${userName}:${password}`)}`
        });
        return this.api.getRequest('users/login', undefined, headers)
        .pipe(
            tap(res => {
                this.token = res.token;
                this.loggedUserSubj$.next(res);
                this.isLogged = true;
                this.saveToken(res.token);
            })
        );
    }

    public logOut(): void {
        this.isLogged = false;
        this.deleteToken();
        this.loggedUserSubj$.next(null);
    }

    public signUp(username: string, password: string): Observable<any> {
        const body = {
            username,
            password
        };
        return this.api.postRequest('users/signup', body)
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

    private saveToken(token: string): void {
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
            this.isLogged = true;
            return true;
        }
        return false;
    }

    private getCurrentUser(): Observable<any> {
        return this.api.getRequest('users/current');
    }

    public changeLoggedUserInfo(newInfo: User): void {
        this.loggedUserSubj$.next(newInfo);
    }
}
