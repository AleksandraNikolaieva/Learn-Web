import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isLogged = true;
    private loggedUser = 'Sasha Nikolaieva';

    constructor() { }

    public isUserLogged(): boolean {
        return this.isLogged;
    }

    public getLoggedUser() {
        return this.loggedUser;
    }
}
