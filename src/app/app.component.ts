import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from './store/reducers';
import { selectAuthenticated } from './auth/store/auth.selectors';
import { tap } from 'rxjs/operators';
import { CurrentUserRequested } from './auth/store/auth.actions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.pug',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
    isNavMenuOpen = false;
}
