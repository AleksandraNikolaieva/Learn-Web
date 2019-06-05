import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Comment } from '../models';
import { WorkshopsService } from 'src/app/services/workshops.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/models';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-workshop-comments',
    templateUrl: './workshop-comments.component.pug',
    styleUrls: ['./workshop-comments.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkshopCommentsComponent implements OnInit {
    comments: Array<Comment>;
    loggedUser: User;
    editorNumber: number;
    newComment: Comment;

    constructor(
        private workshopsService: WorkshopsService,
        private route: ActivatedRoute,
        private authService: AuthService
        ) { }

    ngOnInit() {
        this.route.parent.parent.params.subscribe(params => {
            this.workshopsService.getArticleById(params.id).subscribe(res => {
                const article = res;
                this.comments = article.comments;
            });
        });

        this.loggedUser = this.authService.getLoggedUser();
        this.newComment = {
            author: this.loggedUser,
            text: '',
            date: new Date()
        };
    }

    private editComment(comment: Comment, index: number): void {
        this.comments[index] = comment;
        this.editorNumber = null;
    }

    private deleteComment(index: number): void {
        this.comments.splice(index, 1);
    }

    private openEditor(index: number): void {
        this.editorNumber = index;
    }

    addComment(newComment: Comment): void {
        this.comments.unshift(newComment);
        this.newComment = {
            author: this.loggedUser,
            text: '',
            date: null
        };
    }
}
