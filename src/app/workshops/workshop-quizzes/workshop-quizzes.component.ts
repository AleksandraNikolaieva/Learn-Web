import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quizz } from 'src/app/quizzes/models';
import { QuizzesService } from 'src/app/services/quizzes.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-workshop-quizzes',
    templateUrl: './workshop-quizzes.component.pug',
    styleUrls: ['./workshop-quizzes.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkshopQuizzesComponent implements OnInit {
    quizzes$: Observable<Array<Quizz>>;

    constructor(
        private route: ActivatedRoute,
        private quizzesService: QuizzesService) { }

    ngOnInit() {
        const postId = this.route.snapshot.parent.parent.params.id;
        this.quizzes$ = this.quizzesService.getQuizzesWithParams({postId});
    }

}
