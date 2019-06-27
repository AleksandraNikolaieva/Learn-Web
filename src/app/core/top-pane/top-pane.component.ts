import { Component, OnInit,
        Input, Output,
        EventEmitter, ChangeDetectionStrategy,
        ViewChild, ElementRef,
        ChangeDetectorRef, OnDestroy } from '@angular/core';
import { User } from '../models';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/reducers';
import { Store, select } from '@ngrx/store';
import { selectAuthData } from 'src/app/auth/store/auth.selectors';
import { AuthData } from 'src/app/auth/models';

@Component({
    selector: 'app-top-pane',
    templateUrl: './top-pane.component.pug',
    styleUrls: ['./top-pane.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopPaneComponent implements OnInit, OnDestroy {
    user: User;
    initials: string;
    @Input() isNavMenuOpen: boolean;
    @Output() navMenuChange = new EventEmitter<boolean>();
    @ViewChild('forSearch') search: ElementRef;
    isUserMenuOpen = false;
    isSearchOpen = false;
    subscription: Subscription;

    constructor(
        private authService: AuthService,
        private cdf: ChangeDetectorRef,
        private store: Store<AppState>) { }

    ngOnInit() {
        this.subscription = this.store.pipe(
            select(selectAuthData)
        )
        .subscribe((authData: AuthData) => {
            this.user = authData;
            if (authData) {
                this.getInitials();
            }
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    toggleUserMenu(): void {
        this.isUserMenuOpen = !this.isUserMenuOpen;
    }

    doSearch(forSearch: string): void {
        console.log(forSearch);
        // do search
    }

    toggleNavMenu(): void {
        this.isNavMenuOpen = !this.isNavMenuOpen;
        this.navMenuChange.emit(this.isNavMenuOpen);
    }

    closeSearch(): void {
        this.isSearchOpen = false;
    }

    activateSearch() {
        this.isSearchOpen = true;
        this.navMenuChange.emit(false);
        setTimeout(() => this.search.nativeElement.focus(), 100);
    }

    private getInitials(): void {
        this.initials = '';
        if (this.user.firstName) {
            this.initials += this.user.firstName[0];
        }
        if (this.user.lastName) {
            this.initials += this.user.lastName[0];
        }
        this.cdf.detectChanges();
    }
}
