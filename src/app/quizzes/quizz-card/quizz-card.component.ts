import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Quizz } from '../models';
import { User } from 'src/app/core/models';
import { Dictionary } from '@ngrx/entity';
import { ConfirmPopupService } from 'src/app/core/pop-up/confirm-popup.service';

@Component({
    selector: 'app-quizz-card',
    templateUrl: './quizz-card.component.pug',
    styleUrls: ['./quizz-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizzCardComponent implements OnInit {
    @Input() quizz: Quizz;
    @Input() loggedUser: User;
    @Input() usersMap: Dictionary<User>;
    @Output() deleted: EventEmitter<string> = new EventEmitter();
    @Output() edited: EventEmitter<string> = new EventEmitter();

    constructor(private popupService: ConfirmPopupService) { }

    ngOnInit() {}

    delete(id: string) {
        this.popupService
        .confirm({
            title: 'Delete quizz',
            message: 'Are you sure that you want to delete this quizz?'
        })
        .subscribe((confirmed: boolean) => {
            this.deleted.emit(id);
        });
    }

    edit(id: string) {
        this.edited.emit(id);
    }
}
