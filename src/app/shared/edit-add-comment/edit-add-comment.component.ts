import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Comment } from 'src/app/workshops/models';

@Component({
    selector: 'app-edit-add-comment',
    templateUrl: './edit-add-comment.component.pug',
    styleUrls: ['./edit-add-comment.component.scss']
})
export class EditAddCommentComponent implements OnInit {
    @Input() comment: Comment;
    @Output() changeComment = new EventEmitter<Comment>();

    constructor() { }

    ngOnInit() {
    }

    private submit(text: string): void {
        const newComment = {... this.comment};
        if (text) {
            newComment.text = text;
            newComment.date = new Date();
            this.changeComment.emit(newComment);
        }
    }
}
