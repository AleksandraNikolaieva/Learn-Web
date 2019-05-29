import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-tab',
    templateUrl: './tab.component.pug',
    styleUrls: ['./tab.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabComponent implements OnInit {
    @Input() title: string;

    constructor() { }

    ngOnInit() {
    }


}
