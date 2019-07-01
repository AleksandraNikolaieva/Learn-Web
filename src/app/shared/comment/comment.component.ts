import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Comment } from 'src/app/workshops/models';
import { Dictionary } from '@ngrx/entity';
import { User } from 'src/app/core/models';

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.pug',
    styleUrls: ['./comment.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentComponent implements OnInit {
    @Input() comment: Comment;
    @Input() usersMap: Dictionary<User>;

    constructor() { }

    ngOnInit() {
    }

}
