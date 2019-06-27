import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { SignInRequested } from '../store/auth.actions';
import { Credentials } from '../models';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.pug',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private store: Store<AppState>,
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit() {
        if (this.authService.isUserLogged()) {
            this.router.navigateByUrl('workshops/feed');
        }
        this.loginForm = this.fb.group({
            username: [null, [Validators.required, Validators.minLength(2)]],
            password: [null, [Validators.required, Validators.minLength(6)]]
        });
    }

    logIn(): void {
        if (this.loginForm.valid) {
            this.store.dispatch(new SignInRequested({credentials: this.loginForm.value}));
        } else {
            alert('form invalid');
        }
    }

    signUp(): void {
        this.authService.signUp(this.loginForm.value)
        .subscribe((credentials: Credentials) => {
            console.log(credentials);
            this.store.dispatch(new SignInRequested({credentials: this.loginForm.value, redirectTo: 'account'}));
        });
    }
}
