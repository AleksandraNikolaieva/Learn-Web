import { Component, OnInit, ChangeDetectionStrategy, HostBinding, Input } from '@angular/core';
import { enterLeaveWidth } from 'src/app/common/animations';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-auxiliary-content',
    templateUrl: './auxiliary-content.component.pug',
    styleUrls: ['./auxiliary-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [enterLeaveWidth]
})
export class AuxiliaryContentComponent implements OnInit {
    @HostBinding('@enterLeaveWidth') animate = true;
    tabs: Array<string>;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.tabs = this.route.snapshot.data.tabs;
    }
}
