import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Article } from '../models';
import { Tag } from 'src/app/shared/models';
import { Dictionary } from '@ngrx/entity';
import { User } from 'src/app/core/models';

@Component({
    selector: 'app-article',
    templateUrl: './article.component.pug',
    styleUrls: ['./article.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleComponent implements OnInit {
    @Input() article: Article;
    @Input() tagsMap: Dictionary<Tag>;
    @Input() usersMap: Dictionary<User>;
    @Input() loggedUser: User;
    @Output() deleted: EventEmitter<string> = new EventEmitter();

    constructor() { }

    ngOnInit() {}

    changeLikeHandler(to: boolean): void {
        // send changes to server
    }

    deleteArticle(id: string) {
        this.deleted.emit(id);
    }
}
