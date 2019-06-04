import { Component, OnInit, Input, TRANSLATIONS_FORMAT, ChangeDetectionStrategy } from '@angular/core';
import { DateFormat } from '../models';

@Component({
    selector: 'app-timestamp',
    templateUrl: './timestamp.component.pug',
    styleUrls: ['./timestamp.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimestampComponent implements OnInit {
    formats = {
        day: 'yyy-MM-dd',
        dayTime: 'yyy-MM-dd HH:mm',
        time: 'H:mm'
    };
    @Input() date: Date;
    @Input() set toFormat(reqformat: DateFormat) { this.dateFormat = this.formats[reqformat]; }
    dateFormat: string;

    constructor() { }

    ngOnInit() {
    }
}
