import { Component, OnInit, Input, TRANSLATIONS_FORMAT, ChangeDetectionStrategy } from '@angular/core';
import { DateFormat } from '../models';

@Component({
    selector: 'app-timestamp',
    templateUrl: './timestamp.component.pug',
    styleUrls: ['./timestamp.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimestampComponent implements OnInit {
    formats = new Map([
        ['day', 'yyyy-MM-dd'],
        ['dayTime', 'yyyy-MM-dd HH:mm'],
        ['time', 'H:mm']
    ]);
    @Input() date: Date;
    @Input() set toFormat(reqformat: DateFormat) { this.dateFormat = this.formats.get(reqformat); }
    dateFormat: string;

    constructor() { }

    ngOnInit() {
    }
}
