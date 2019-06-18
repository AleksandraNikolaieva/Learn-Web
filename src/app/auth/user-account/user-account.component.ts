import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User, Role } from 'src/app/core/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
        private usersService: UsersService,
        private router: Router,
        private fb: FormBuilder) { }

    ngOnInit() {
        this.infoForm = this.fb.group({
            firstName: ['', Validators.minLength(2)],
            lastName: ['', Validators.minLength(2)],
            picture: [''],
            newPassword: [null, Validators.minLength(6)]
        });
        this.subscription = this.authService.getLoggedUserObs()
        .subscribe(res => {
            if (res) {
                this.user = res;
                this.infoForm.patchValue(res);
            }
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    changeInfo(): void {
        const values = this.infoForm.value;

        this.usersService.updateUser(this.user._id, values.firstName, values.lastName, values.picture, values.newPassword)
        .subscribe(res => {
            if (res) {
                this.authService.changeLoggedUserInfo(res);
                alert('changed succesfully');
            }
        });
    }

    deleteProfile(): void {
        this.usersService.deleteUserById(this.user._id).subscribe(res => {
            if (res) {
                alert('Profile successfully deleted');
                this.logOut();
                this.router.navigate(['/']);
            }
        });
    }

    logOut(): void {
        this.authService.logOut();
        this.router.navigate(['/']);
    }
}
