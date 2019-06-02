import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { User } from '../models';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-top-pane',
    templateUrl: './top-pane.component.pug',
    styleUrls: ['./top-pane.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopPaneComponent implements OnInit {
    user: User;
    initials: string;
    @Input() isNavMenuOpen: boolean;
    @Output() navMenuChange = new EventEmitter<boolean>();
    @ViewChild('forSearch') search: ElementRef;
    isUserMenuOpen = false;
    isSearchOpen = false;

    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.user = this.authService.getLoggedUser();
        this.getInitials();
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
        const nameArr: Array<string> = this.user.name.split(' ');
        this.initials = nameArr[0][0] + nameArr[1][0];
    }
}
