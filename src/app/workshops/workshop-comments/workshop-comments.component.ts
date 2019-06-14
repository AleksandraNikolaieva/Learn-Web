import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Comment } from '../models';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/models';
import { AuthService } from 'src/app/services/auth.service';
import { CommentsService } from 'src/app/services/comments.service';
import { map } from 'rxjs/operators';
import { UsersService } from 'src/app/services/users.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-workshop-comments',
    templateUrl: './workshop-comments.component.pug',
    styleUrls: ['./workshop-comments.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkshopCommentsComponent implements OnInit, OnDestroy {
    comments: Array<Comment>;
    loggedUser: User;
    editorNumber: number;
    newComment: any;
    postId: string;
    subscriptions: Array<Subscription> = [];

    constructor(
        private commentsService: CommentsService,
        private route: ActivatedRoute,
        private authService: AuthService,
        private userService: UsersService,
        private cdr: ChangeDetectorRef
        ) { }

    ngOnInit() {
        this.route.parent.parent.params.subscribe(params => {
            this.postId = params.id;
            this.newComment = {
                postId: this.postId,
                text: ''
            };
            this.subscriptions.push(
                this.commentsService.getCommentsByPostId(this.postId)
                .pipe(
                    map(commentsArr => commentsArr.map(commentItem => {
                        commentItem.author = this.userService.getUserById(commentItem._author);
                        return commentItem;
                    }))
                ).subscribe(res => {
                    this.comments = res;
                    this.cdr.detectChanges();
                })
            );
        });

        this.authService.getLoggedUserObs().subscribe(res => {
            this.loggedUser = res;
            this.cdr.detectChanges();
        });
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => {
            subscription.unsubscribe();
        });
    }

    private editComment(id: string, text: string): void {
        this.subscriptions.push(
            this.commentsService.updateComment(this.postId, id, text)
            .subscribe(res => {
                /* const index = this.comments.findIndex(commetItem => commetItem._id === id);
                this.comments[index].text = text; */
            })
        );
        this.editorNumber = null;
    }

    private deleteComment(id: string): void {
        this.subscriptions.push(
            this.commentsService.deleteComment(this.postId, id)
            .subscribe(res => {
                this.comments.filter(comment => comment._id !== id);
                this.cdr.detectChanges();
            })
        );
    }

    private openEditor(index: number): void {
        this.editorNumber = index;
    }

    addComment(text: string): void {
        this.subscriptions.push(
            this.commentsService.createComment(this.postId, text)
            .pipe(
                map(comment => {
                    comment.author = this.userService.getUserById(comment._author);
                    return comment;
                })
            ).subscribe(res => {
                this.comments.push(res);
                this.cdr.detectChanges();
            })
        );
        this.newComment = {
            postId: this.postId,
            text: ''
        };
    }
}
