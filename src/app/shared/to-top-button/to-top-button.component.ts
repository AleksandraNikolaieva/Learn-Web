import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-to-top-button',
    templateUrl: './to-top-button.component.pug',
    styleUrls: ['./to-top-button.component.scss']
})
export class ToTopButtonComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

    private goToTop(): void {
        console.log('going top');
    }
}
