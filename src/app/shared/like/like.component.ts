import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-like',
    templateUrl: './like.component.pug',
    styleUrls: ['./like.component.scss']
})
export class LikeComponent implements OnInit {
    @Input() isActive: boolean;
    @Input() likesNumber: number;
    @Output() changeLike = new EventEmitter<boolean>();
    ishover = false;
    constructor() { }

    ngOnInit() {
    }

    private toggleLike() {
        this.isActive = !this.isActive;
        console.log(this.isActive);
        if (this.isActive) {
            this.likesNumber++;
        } else {
            this.likesNumber--;
        }
        this.changeLike.emit(this.isActive);
    }
}
