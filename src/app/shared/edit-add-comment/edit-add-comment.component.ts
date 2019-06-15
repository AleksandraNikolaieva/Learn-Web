import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Comment } from 'src/app/workshops/models';

@Component({
    selector: 'app-edit-add-comment',
    templateUrl: './edit-add-comment.component.pug',
    styleUrls: ['./edit-add-comment.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditAddCommentComponent implements OnInit {
    @Input() commentText: string;
    @Output() changeComment = new EventEmitter<string>();

    constructor() { }

    ngOnInit() {
    }

    submit(): void {
        if (this.commentText) {
            this.changeComment.emit(this.commentText);
        }
    }
}
