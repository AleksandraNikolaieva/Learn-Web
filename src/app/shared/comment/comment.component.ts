import { Component, OnInit, Input } from '@angular/core';
import { Comment } from 'src/app/workshops/models';

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.pug',
    styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
    @Input() comment: Comment;
    constructor() { }

    ngOnInit() {
    }

}
