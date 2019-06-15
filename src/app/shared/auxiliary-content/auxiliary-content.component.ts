import { Component, OnInit, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { enterLeaveWidth } from 'src/app/common/animations';

@Component({
    selector: 'app-auxiliary-content',
    templateUrl: './auxiliary-content.component.pug',
    styleUrls: ['./auxiliary-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [enterLeaveWidth]
})
export class AuxiliaryContentComponent implements OnInit {
    @HostBinding('@enterLeaveWidth') animate = true;

    constructor() {}

    ngOnInit() {
    }
}
