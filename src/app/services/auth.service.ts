import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isLogged = true;

    constructor() { }

    public isUserLogged(): boolean {
        return this.isLogged;
    }
}
