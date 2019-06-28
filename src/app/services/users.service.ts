import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { User, Role, UserParams } from '../core/models';
import { tap, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    constructor(private api: ApiService) {
    }

    createUser(username: string, password: string, role?: Role): Observable<User> {
        const body = {
            username,
            password,
            role
        };
        return this.api.postRequest('users', body);
    }

    getAllUsers(): Observable<Array<User>> {
        return this.api.getRequest('users');
    }

    getUserById(id: string): Observable<User> {
        return this.api.getRequest(`users/${id}`);
    }

    updateUser(id: string, newInfo: UserParams): Observable<User> {
        return this.api.putRequest(`users/${id}`, newInfo)
        .pipe(
            map(res => res.user)
        );
    }

    deleteUserById(id: string) {
        return this.api.deleteRequest(`users/${id}`);
    }
}
