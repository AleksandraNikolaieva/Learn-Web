import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { User, Role } from '../core/models';
import { AuthService } from './auth.service';
import { tap, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    constructor(private api: ApiService) {
    }

    public createUser(username: string, password: string, role?: Role): Observable<User> {
        const body = {
            username,
            password,
            role
        };
        return this.api.postRequest('users', body);
    }

    public getAllUsers(): Observable<Array<User>> {
        return this.api.getRequest('users');
    }

    public getUserById(id: string): Observable<User> {
        return this.api.getRequest(`users/${id}`);
    }

    public updateUser(
        id: string,
        firstName?: string,
        lastName?: string,
        picture?: string,
        newPassword?: string
    ): Observable<User> {
        const body = {
            firstName,
            lastName,
            picture,
            newPassword
        };
        return this.api.putRequest(`users/${id}`, body)
        .pipe(
            map(res => res.user)
        );
    }

    public deleteUserById(id: string) {
        return this.api.deleteRequest(`users/${id}`);
    }
}
