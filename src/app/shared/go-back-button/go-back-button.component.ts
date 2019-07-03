import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-go-back-button',
    templateUrl: './go-back-button.component.pug',
    styleUrls: ['./go-back-button.component.scss']
})
export class GoBackButtonComponent implements OnInit {
    @Input() link: string;
    
    constructor() { }

    ngOnInit() {
    }

}
