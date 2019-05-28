import { Injectable } from '@angular/core';
import { User } from '../core/models';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isLogged = true;
    private loggedUser: User = {
        id: 1,
        name: 'Sasha Nikolaieva',
        imgSrc: '../assets/images/defUser.png'
    };

    constructor() { }

    public isUserLogged(): boolean {
        return this.isLogged;
    }

    public getLoggedUser() {
        return this.loggedUser;
    }
}
