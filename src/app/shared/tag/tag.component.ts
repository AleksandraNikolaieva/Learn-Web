import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Tag } from '../models';

@Component({
    selector: 'app-tag',
    templateUrl: './tag.component.pug',
    styleUrls: ['./tag.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagComponent implements OnInit {
    @Input() tag: Tag;
    constructor() { }

    ngOnInit() {
    }

    private toggleActive(): void {
        this.tag.isActive = !this.tag.isActive;
    }
}
