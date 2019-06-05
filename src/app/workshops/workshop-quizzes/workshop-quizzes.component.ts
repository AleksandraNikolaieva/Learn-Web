import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-workshop-quizzes',
    templateUrl: './workshop-quizzes.component.pug',
    styleUrls: ['./workshop-quizzes.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkshopQuizzesComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
