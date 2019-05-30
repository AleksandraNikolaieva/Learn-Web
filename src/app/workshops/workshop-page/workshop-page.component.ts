import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article, Comment } from '../models';
import { User } from 'src/app/core/models';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-workshop-page',
    templateUrl: './workshop-page.component.pug',
    styleUrls: ['./workshop-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkshopPageComponent implements OnInit, OnDestroy {
    article: Article;
    loggedUser: User = { // get from the state
        id: 2,
        name: 'Sasha Nikolaieva',
        imgSrc: ''
    };
    newComment: Comment = {
        author: this.loggedUser,
        text: '',
        date: new Date()
    };
    editorNumber: number;
    isButtonPlus: boolean;
    subscription: Subscription;
    constructor(private activateRoute: ActivatedRoute) { }

    ngOnInit() {
        this.setAuxiliaryStatus();
        this.subscription = this.activateRoute.data.subscribe(data => {
            this.article = data.workshop;
        });
    }

    setAuxiliaryStatus() {
        if (this.activateRoute.children.length > 0) {
            this.isButtonPlus = false;
        } else {
            this.isButtonPlus = true;
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    changeLikeHandler(to: boolean): void {
        console.log('workshop page like', to);
        // send changes to server
    }

    addComment(newComment: Comment): void {
        this.article.comments.push(newComment);
        this.newComment = {
            author: this.loggedUser,
            text: '',
            date: null
        };
    }

    private editComment(comment: Comment, index: number): void {
        this.article.comments[index] = comment;
        this.editorNumber = null;
    }

    private deleteComment(index: number): void {
        this.article.comments.splice(index, 1);
    }

    private openEditor(index: number): void {
        this.editorNumber = index;
    }

    changeButton() {
        this.isButtonPlus = !this.isButtonPlus;
    }
}
