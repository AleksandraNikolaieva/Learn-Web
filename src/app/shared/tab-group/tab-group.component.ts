import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-tab-group',
    templateUrl: './tab-group.component.pug',
    styleUrls: ['./tab-group.component.scss']
})
export class TabGroupComponent implements OnInit {
    tabTitles = ['One', 'Two', 'Three', 'Four'];
    constructor() { }

    ngOnInit() {
    }

}
