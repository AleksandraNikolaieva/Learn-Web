import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Comment } from '../models';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/models';
import { AuthService } from 'src/app/services/auth.service';
import { CommentsService } from 'src/app/services/comments.service';
import { map, switchMap, tap } from 'rxjs/operators';
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
    newComment = '';
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
        this.subscriptions.push(
            this.route.data.subscribe(res => {
                this.comments = res.comments;
            })
        );
        this.route.parent.parent.params.subscribe(res => {
            this.postId = res.id;
        });

        this.subscriptions.push(
            this.authService.getLoggedUserObs().subscribe(res => {
                this.loggedUser = res;
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
        console.log(this.postId);
        this.commentsService.createComment(this.postId, text)
        .pipe(
            map(comment => {
                comment.author$ = this.userService.getUserById(comment._author);
                return comment;
            })
        ).subscribe(res => {
            this.comments.unshift(res);
            this.cdr.detectChanges();
        });
    }
}
