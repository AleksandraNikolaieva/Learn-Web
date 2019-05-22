import { Component, OnInit, Input, TRANSLATIONS_FORMAT, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-timestamp',
    templateUrl: './timestamp.component.pug',
    styleUrls: ['./timestamp.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimestampComponent implements OnInit {
    @Input() date: Date;
    @Input() toFormat: string;
    constructor() { }

    ngOnInit() {
    }
}
