import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
    selector: 'app-to-top-button',
    templateUrl: './to-top-button.component.pug',
    styleUrls: ['./to-top-button.component.scss']
})
export class ToTopButtonComponent implements OnInit {
    @Input() hostElement: HTMLElement;
    constructor() { }

    ngOnInit() {
    }

    private goToTop(): void {
        this.hostElement.scrollTo({left: 0, top: 0, behavior: 'smooth'});
    }
}
