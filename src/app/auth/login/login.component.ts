import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.pug',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {
    loginForm: FormGroup;
    subscriptions: Array<Subscription> = [];

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router) { }

    ngOnInit() {
        if (this.authService.isUserLogged()) {
            this.router.navigate(['/']);
        }
        this.loginForm = this.fb.group({
            userName: [null, [Validators.required, Validators.minLength(2)]],
            password: [null, [Validators.required, Validators.minLength(6)]]
        });
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => {
            subscription.unsubscribe();
        });
    }

    logIn(): void {
        const values = this.loginForm.value;
        this.subscriptions.push(
            this.authService.logUser(values.userName, values.password)
            .subscribe(res => this.router.navigate(['/']))
        );
    }

    signUp(): void {
        const values = this.loginForm.value;
        this.subscriptions.push(
            this.authService.signUp(values.userName, values.password)
            .pipe(
                switchMap(res => this.authService.logUser(values.userName, values.password))
            )
            .subscribe(res => this.router.navigate(['account']))
        );
    }
}
