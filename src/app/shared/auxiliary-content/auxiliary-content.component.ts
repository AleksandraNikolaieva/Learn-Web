import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-auxiliary-content',
    templateUrl: './auxiliary-content.component.pug',
    styleUrls: ['./auxiliary-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuxiliaryContentComponent implements OnInit {
    isAuxOpen = true;
    auxItems = new Array(10);
    constructor() { }

    ngOnInit() {
    }

    toggleAux(): void {
        this.isAuxOpen = !this.isAuxOpen;
    }
}
