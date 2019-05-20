import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../models';

@Component({
    selector: 'app-top-pane',
    templateUrl: './top-pane.component.pug',
    styleUrls: ['./top-pane.component.scss']
})
export class TopPaneComponent implements OnInit {
    user: User = {
        id: 1,
        name: 'Name Loooooooooooooooong',
        imgSrc: '../assets/images/defUser.png'
    };
    @Input() isNavMenuOpen: boolean;
    @Output() navMenuChange = new EventEmitter<boolean>();
    isUserMenuOpen = false;
    isSearchOpen = false;

    constructor() { }

    ngOnInit() {
    }

    private toggleUserMenu(): void {
        this.isUserMenuOpen = !this.isUserMenuOpen;
    }

    private doSearch(forSearch: string): void {
        console.log(forSearch);
        // do search
    }

    private toggleNavMenu(): void {
        this.isNavMenuOpen = !this.isNavMenuOpen;
        this.navMenuChange.emit(this.isNavMenuOpen);
    }

    private toggleSearch(): void {
        this.isSearchOpen = !this.isSearchOpen;
        this.navMenuChange.emit(false);
    }
}
