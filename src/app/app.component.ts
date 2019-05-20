import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.pug',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    isNavMenuOpen = false;
    isAuxOpen = true;

    auxItems = new Array(10);

    private toggleAux() {
        this.isAuxOpen = !this.isAuxOpen;
    }
}
