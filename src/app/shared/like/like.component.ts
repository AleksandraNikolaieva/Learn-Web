import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-like',
    templateUrl: './like.component.pug',
    styleUrls: ['./like.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LikeComponent implements OnInit {
    @Input() isActive: boolean;
    @Input() likesNumber: number;
    @Output() changeLike = new EventEmitter<boolean>();
    constructor() { }

    ngOnInit() {
    }

    toggleLike(): void {
        this.isActive = !this.isActive;
        if (this.isActive) {
            this.likesNumber++;
        } else {
            this.likesNumber--;
        }
        this.changeLike.emit(this.isActive);
    }
}
