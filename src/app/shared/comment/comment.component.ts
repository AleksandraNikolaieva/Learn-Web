import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Comment } from 'src/app/workshops/models';

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.pug',
    styleUrls: ['./comment.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentComponent implements OnInit {
    @Input() comment: Comment;

    constructor() { }

    ngOnInit() {
    }

}
