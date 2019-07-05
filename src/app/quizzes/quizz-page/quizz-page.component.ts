import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Quizz } from '../models';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { QuizzPageRequested } from '../store/quizzes.actions';
import { Observable } from 'rxjs';
import { selectPageQuizz } from '../store/quizzes.selectors';
import { QuizzesService } from 'src/app/services/quizzes.service';
import { skip } from 'rxjs/operators';

@Component({
    selector: 'app-quizz-page',
    templateUrl: './quizz-page.component.pug',
    styleUrls: ['./quizz-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizzPageComponent implements OnInit {
    quizz$: Observable<Quizz>;
    id: string;

    constructor(
        private route: ActivatedRoute,
        private store: Store<AppState>,
        private quizzService: QuizzesService
    ) { }

    ngOnInit() {
        this.id = this.route.snapshot.params.id;
        this.store.dispatch(new QuizzPageRequested({quizzId: this.id}));

        this.quizz$ = this.store.select(selectPageQuizz).pipe(skip(1));
    }

    onSubmit(formValue: any) {
        const toSend = [];
        for (const key in formValue) {
            if (formValue.hasOwnProperty(key)) {
                if (!Array.isArray(formValue[key])) {
                    toSend.push(formValue[key]);
                } else {
                    toSend.push(formValue[key][0]);
                }
            }
        }
        this.quizzService.validateQuizz(this.id, {formData: toSend})
        .subscribe(res => {
            const rightAnswers = res.results.filter(item => item === true).length;
            alert(`${res.message} \n${rightAnswers} of ${res.results.length} answers is right`);
        });
    }
}
