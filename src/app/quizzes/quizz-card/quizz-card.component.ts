import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Quizz } from '../models';
import { User } from 'src/app/core/models';

@Component({
    selector: 'app-quizz-card',
    templateUrl: './quizz-card.component.pug',
    styleUrls: ['./quizz-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizzCardComponent implements OnInit {
    @Input() quizz: Quizz;
    @Input() loggedUser: User;
    @Output() deleted: EventEmitter<number> = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    delete(id: number) {
        this.deleted.emit(id);
    }
}
