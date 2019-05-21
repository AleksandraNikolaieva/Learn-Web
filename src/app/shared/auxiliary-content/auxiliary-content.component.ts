import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-auxiliary-content',
    templateUrl: './auxiliary-content.component.pug',
    styleUrls: ['./auxiliary-content.component.scss']
})
export class AuxiliaryContentComponent implements OnInit {
    isAuxOpen = true;
    auxItems = new Array(10);
    constructor() { }

    ngOnInit() {
    }

    private toggleAux() {
        this.isAuxOpen = !this.isAuxOpen;
    }
}
