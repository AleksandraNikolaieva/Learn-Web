import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { UsersService } from 'src/app/services/users.service';
import { UsersRequested, UsersActionTypes, UsersReceived, UsersRequestFalled } from './users.actions';
import { exhaustMap, map, catchError } from 'rxjs/operators';
import { User } from 'src/app/core/models';
import { of } from 'rxjs';

@Injectable()
export class UsersEffects {

    constructor(
        private actions$: Actions,
        private usersService: UsersService
    ) { }

    @Effect()
    $usersRequested = this.actions$
    .pipe(
        ofType<UsersRequested>(UsersActionTypes.UsersRequested),
        exhaustMap(() => {
            return this.usersService.getAllUsers()
            .pipe(
                map((users: User[]) => {
                    return new UsersReceived({users});
                }),
                catchError(error => {
                    return of(new UsersRequestFalled({error}));
                })
            );
        })
    );
}
