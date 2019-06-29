import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Tag } from '../models';

@Component({
    selector: 'app-tag',
    templateUrl: './tag.component.pug',
    styleUrls: ['./tag.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagComponent implements OnInit {
    @Input() tag: Tag;
    @Output() changeActive = new EventEmitter<string>();
    constructor() { }

    ngOnInit() {}

    toggleActive(): void {
        this.changeActive.emit(this.tag.seq.toString());
    }
}
