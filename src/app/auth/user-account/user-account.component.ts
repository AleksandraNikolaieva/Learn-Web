import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User, Role } from 'src/app/core/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { SignedOut, SignedIn, ChangeUserInfoRequested } from '../store/auth.actions';
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
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.formInit();

        this.subscription = this.store.pipe(
            select(selectAuthData)
        ).subscribe((authData: AuthData) => {
            this.user = authData;
            if (authData) {
                this.infoForm.patchValue(authData);
            }
        });
    }

    formInit() {
        this.infoForm = this.fb.group({
            firstName: ['', Validators.minLength(2)],
            lastName: ['', Validators.minLength(2)],
            picture: [''],
            newPassword: [null, Validators.minLength(6)]
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    changeInfo(): void {
        this.store.dispatch(new ChangeUserInfoRequested({id: this.user._id, newInfo: this.infoForm.value}));
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
