import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-go-back-button',
    templateUrl: './go-back-button.component.pug',
    styleUrls: ['./go-back-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoBackButtonComponent implements OnInit {

    constructor(
        private location: Location
    ) { }

    ngOnInit() {
    }

    goBack() {
        this.location.back();
    }
}
