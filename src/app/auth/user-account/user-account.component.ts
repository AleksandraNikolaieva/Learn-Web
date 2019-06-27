import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User, Role } from 'src/app/core/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { SignedOut, ChangeAuthData } from '../store/auth.actions';
import { selectAuthData } from '../store/auth.selectors';
import { AuthData } from '../models';

@Component({
    selector: 'app-user-account',
    templateUrl: './user-account.component.pug',
    styleUrls: ['./user-account.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserAccountComponent implements OnInit, OnDestroy {
    user: User;
    infoForm: FormGroup;
    subscription: Subscription;
    constructor(
        private authService: AuthService,
        private store: Store<AppState>,
        private usersService: UsersService,
        private fb: FormBuilder) { }

    ngOnInit() {
        this.infoForm = this.fb.group({
            firstName: ['', Validators.minLength(2)],
            lastName: ['', Validators.minLength(2)],
            picture: [''],
            newPassword: [null, Validators.minLength(6)]
        });

        this.subscription = this.store.pipe(
            select(selectAuthData)
        )
        .subscribe((authData: AuthData) => {
            this.user = authData;
            if (authData) {
                this.infoForm.patchValue(authData);
            }
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    changeInfo(): void {
        const values = this.infoForm.value;

        this.usersService.updateUser(this.user._id, values.firstName, values.lastName, values.picture, values.newPassword)
        .subscribe(newInfo => {
            if (newInfo) {
                this.store.dispatch(new ChangeAuthData({newInfo}));
                alert('changed succesfully');
            }
        });
    }

    deleteProfile(): void {
        this.usersService.deleteUserById(this.user._id).subscribe(res => {
            if (res) {
                alert('Profile successfully deleted');
                this.logOut();
            }
        });
    }

    logOut(): void {
        this.store.dispatch(new SignedOut());
    }
}
