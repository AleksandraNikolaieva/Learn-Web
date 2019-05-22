import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-viewport',
    templateUrl: './viewport.component.pug',
    styleUrls: ['./viewport.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewportComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
