import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-tab-group',
    templateUrl: './tab-group.component.pug',
    styleUrls: ['./tab-group.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabGroupComponent implements OnInit {
    tabs = ['First', 'Second', 'Third', 'Fourth'];
    contents = [new Array(3), new Array(1), new Array(5), new Array(2)];
    selected = 'First';

    constructor() {}
    ngOnInit() {
    }
}
