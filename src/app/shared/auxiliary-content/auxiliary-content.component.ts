import { Component, OnInit, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { leaveWidth } from 'src/app/common/animations';

@Component({
    selector: 'app-auxiliary-content',
    templateUrl: './auxiliary-content.component.pug',
    styleUrls: ['./auxiliary-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [leaveWidth]
})
export class AuxiliaryContentComponent implements OnInit {
    @HostBinding('@leaveWidth') animate = true;

    constructor() {}

    ngOnInit() {
    }
}
