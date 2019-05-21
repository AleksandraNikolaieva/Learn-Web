import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article, Comment } from '../models';
import { articles } from '../workshops';
import { User } from 'src/app/core/models';

@Component({
    selector: 'app-workshop-page',
    templateUrl: './workshop-page.component.pug',
    styleUrls: ['./workshop-page.component.scss']
})
export class WorkshopPageComponent implements OnInit {
    article: Article;
    loggedUser: User = {id: 10, name: 'Ivan Pupkin', imgSrc: ''};
    newComment: Comment = {
        author: this.loggedUser,
        text: '',
        date: new Date()
    };
    editorNumber: number;
    constructor(private activateRoute: ActivatedRoute) { }

    ngOnInit() {
        this.activateRoute.params.subscribe(params => {
            this.article = articles[params.id - 1];
        });
    }

    private changeLikeHandler(to: boolean): void {
        console.log('workshop page like', to);
        // send changes to server
    }

    private addComment(newComment: Comment): void {
        this.article.comments.push(newComment);
        this.newComment = {
            author: this.loggedUser,
            text: '',
            date: new Date()
        };
    }

    private editComment(comment: Comment, index: number): void {
        this.article.comments[index] = comment;
        this.editorNumber = null;
    }

    private deleteComment(index: number) {
        this.article.comments.splice(index, 1);
    }

    private openEditor(index: number) {
        this.editorNumber = index;
    }
}
