import { Component } from '@angular/core';
import { User } from './models';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.pug',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    user: User = {
        id: 1,
        name: 'Name Loooooooooooooooong',
        imgSrc: '../assets/images/defUser.png'
    }
    isUserMenuOpen: boolean = false;
    isNavMenuOpen: boolean = false;
    isSearchOpen: boolean = false;

    private toggleUserMenu(): void {
        this.isUserMenuOpen = !this.isUserMenuOpen;
    }

    private doSearch(forSearch: string): void {
        console.log(forSearch);
        //do search
    }

    private toggleNavMenu(): void {
        this.isNavMenuOpen = !this.isNavMenuOpen;
    }

    private toggleSearch(): void {
        this.isSearchOpen = !this.isSearchOpen;
    }
}
