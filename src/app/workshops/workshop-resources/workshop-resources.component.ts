import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-workshop-resources',
    templateUrl: './workshop-resources.component.pug',
    styleUrls: ['./workshop-resources.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkshopResourcesComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
