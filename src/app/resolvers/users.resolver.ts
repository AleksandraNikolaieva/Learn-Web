import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { User } from '../core/models';
import { UsersService } from '../services/users.service';

@Injectable({
    providedIn: 'root'
})
export class UsersResolver implements Resolve<Array<User>> {

    constructor(private usersService: UsersService) { }

    resolve() {
        return this.usersService.getAllUsers();
    }
}
