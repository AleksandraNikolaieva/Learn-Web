import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { SignInRequested, SignUpRequested } from '../store/auth.actions';
import { Subscription } from 'rxjs';
import { selectAuthenticated } from '../store/auth.selectors';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.pug',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {
    loginForm: FormGroup;
    subscription: Subscription;

    constructor(
        private fb: FormBuilder,
        private store: Store<AppState>,
        private router: Router
    ) { }

    ngOnInit() {
        this.subscription = this.store.pipe(
            select(selectAuthenticated)
        )
        .subscribe((isLogged: boolean) => {
            if (isLogged) {
                this.router.navigateByUrl('workshops/feed');
            }
        });

        this.loginForm = this.fb.group({
            username: [null, [Validators.required, Validators.minLength(2)]],
            password: [null, [Validators.required, Validators.minLength(6)]]
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    logIn(): void {
        if (this.loginForm.valid) {
            this.store.dispatch(new SignInRequested({credentials: this.loginForm.value}));
        } else {
            alert('form invalid');
        }
    }

    signUp(): void {
        if (this.loginForm.valid) {
            this.store.dispatch(new SignUpRequested({credentials: this.loginForm.value}));
        } else {
            alert('form invalid');
        }
    }
}
