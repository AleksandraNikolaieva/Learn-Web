import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-statistic',
    templateUrl: './statistic.component.pug',
    styleUrls: ['./statistic.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
