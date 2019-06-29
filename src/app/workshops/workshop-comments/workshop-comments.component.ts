import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Comment } from '../models';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/models';
import { AuthService } from 'src/app/services/auth.service';
import { CommentsService } from 'src/app/services/comments.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { UsersService } from 'src/app/services/users.service';
import { Subscription, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { selectAuthData } from 'src/app/auth/store/auth.selectors';
import { AuthData } from 'src/app/auth/models';

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
    newComment = '';
    postId: string;
    subscriptions: Array<Subscription> = [];

    constructor(
        private commentsService: CommentsService,
        private route: ActivatedRoute,
        private authService: AuthService,
        private userService: UsersService,
        private cdr: ChangeDetectorRef,
        private store: Store<AppState>
    ) { }

    ngOnInit() {
        this.postId = this.route.snapshot.parent.parent.params.id;

        this.commentsService.getCommentsByPostId(this.postId)
        .pipe(
            map(commentsArr => commentsArr.map(commentItem => {
                commentItem.author$ = this.userService.getUserById(commentItem._author);
                return commentItem;
            }))
        )
        .subscribe((comments: Comment[]) => {
            this.comments = comments;
            this.cdr.detectChanges();
        });

        this.subscriptions.push(
            this.store.pipe(select(selectAuthData))
            .subscribe((user: AuthData) => {
                this.loggedUser = user;
            })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => {
            subscription.unsubscribe();
        });
    }

    private editComment(id: string, text: string): void {
        this.commentsService.updateComment(this.postId, id, text)
        .subscribe(res => {
            const index = this.comments.findIndex(commetItem => commetItem._id === id);
            this.comments[index] = {...this.comments[index]};
            this.comments[index].text = text;
            this.editorNumber = null;
            this.cdr.detectChanges();
        });
    }

    private deleteComment(id: string): void {
        this.commentsService.deleteComment(this.postId, id)
        .subscribe(res => {
            this.comments = this.comments.filter(comment => comment._id !== id);
            this.cdr.detectChanges();
        });
    }

    private openEditor(index: number): void {
        this.editorNumber = index;
    }

    addComment(text: string): void {
        this.commentsService.createComment(this.postId, text)
        .pipe(
            map(comment => {
                comment.author$ = this.userService.getUserById(comment._author);
                return comment;
            })
        ).subscribe(res => {
            this.comments.push(res);
            this.cdr.detectChanges();
        });
    }

    trackByFunction(index: number, item: Comment) {
        if (!item) {
            return null;
        }
        return item._id;
    }
}
