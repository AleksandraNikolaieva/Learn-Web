import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Comment } from '../models';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/models';
import { Subscription, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { selectAuthData } from 'src/app/auth/store/auth.selectors';
import { CommentsRequested, CommentAddRequested, CommentDeleteRequested, CommetModifyRequested } from 'src/app/store/comments/comments.actions';
import { selectCurrentComments } from 'src/app/store/comments/comments.selectors';
import { UsersRequested } from 'src/app/store/users/users.actions';
import { selectUsersEntities } from 'src/app/store/users/users.selectors';
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
    usersMap$: Observable<Dictionary<User>>;

    constructor(
        private route: ActivatedRoute,
        private store: Store<AppState>
    ) { }

    ngOnInit() {
        this.postId = this.route.snapshot.parent.parent.params.id;

        this.store.dispatch(new CommentsRequested({workshopId: this.postId}));
        this.store.dispatch(new UsersRequested());

        this.comments$ = this.store.select(selectCurrentComments);
        this.loggedUser$ = this.store.select(selectAuthData);
        this.usersMap$ = this.store.select(selectUsersEntities);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => {
            subscription.unsubscribe();
        });
    }

    private openEditor(index: number): void {
        this.editorNumber = index;
    }

    editComment(id: string, text: string): void {
        this.store.dispatch(new CommetModifyRequested({postId: this.postId, commentId: id, text}));
        this.editorNumber = null;
    }


    addComment(text: string): void {
        this.store.dispatch(new CommentAddRequested({text, postId: this.postId}));
    }

    deleteComment(id: string): void {
        this.store.dispatch(new CommentDeleteRequested({postId: this.postId, commentId: id}));
    }

    trackByFunction(index: number, item: Comment) {
        if (!item) {
            return null;
        }
        return item._id;
    }
}
