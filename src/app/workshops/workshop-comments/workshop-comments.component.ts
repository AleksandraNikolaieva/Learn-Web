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
import { CommentsReceived, CommentsRequested } from 'src/app/store/comments/comments.actions';
import { selectCurrentComments } from 'src/app/store/comments/comments.selectors';
import { UsersRequested } from 'src/app/store/users/users.actions';
import { selectAllUsers, selectUsersEntities } from 'src/app/store/users/users.selectors';
import { Dictionary } from '@ngrx/entity';

@Component({
    selector: 'app-workshop-comments',
    templateUrl: './workshop-comments.component.pug',
    styleUrls: ['./workshop-comments.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkshopCommentsComponent implements OnInit, OnDestroy {
    comments$: Observable<Array<Comment>>;
    loggedUser$: Observable<User>;
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

        this.store.dispatch(new CommentsRequested({workshopId: this.postId}));
        this.store.dispatch(new UsersRequested());

        this.comments$ = this.store.select(selectCurrentComments);
        this.loggedUser$ = this.store.select(selectAuthData);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => {
            subscription.unsubscribe();
        });
    }

    /* private editComment(id: string, text: string): void {
        this.commentsService.updateComment(this.postId, id, text)
        .subscribe(res => {
            const index = this.comments.findIndex(commetItem => commetItem._id === id);
            this.comments[index] = {...this.comments[index]};
            this.comments[index].text = text;
            this.editorNumber = null;
            this.cdr.detectChanges();
        });
    } */

    /* private deleteComment(id: string): void {
        this.commentsService.deleteComment(this.postId, id)
        .subscribe(res => {
            this.comments = this.comments.filter(comment => comment._id !== id);
            this.cdr.detectChanges();
        });
    } */

    private openEditor(index: number): void {
        this.editorNumber = index;
    }

    /* addComment(text: string): void {
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
    } */

    trackByFunction(index: number, item: Comment) {
        if (!item) {
            return null;
        }
        return item._id;
    }
}
