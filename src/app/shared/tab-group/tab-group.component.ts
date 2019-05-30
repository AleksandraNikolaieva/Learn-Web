import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-tab-group',
    templateUrl: './tab-group.component.pug',
    styleUrls: ['./tab-group.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabGroupComponent implements OnInit {
    tabs = ['comments', 'resources', 'quizzes'];

    constructor() {}
    ngOnInit() {
    }
}
