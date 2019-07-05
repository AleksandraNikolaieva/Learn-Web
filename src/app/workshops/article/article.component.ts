import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Article } from '../models';
import { Tag } from 'src/app/shared/models';
import { Dictionary } from '@ngrx/entity';
import { User } from 'src/app/core/models';
import { ConfirmPopupService } from 'src/app/core/pop-up/confirm-popup.service';

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

    constructor(private popupService: ConfirmPopupService) { }

    ngOnInit() {}

    changeLikeHandler(to: boolean): void {
        // send changes to server
    }

    deleteArticle(id: string) {
        this.popupService
        .confirm({
            title: 'Delete workshop',
            message: 'Are you sure that you want to delete this workshop?'
        })
        .subscribe((confirmed: boolean) => {
            this.deleted.emit(id);
        });
    }
}
