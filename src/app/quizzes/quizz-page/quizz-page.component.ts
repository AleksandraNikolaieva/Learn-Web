import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Quizz } from '../models';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { QuizzPageRequested } from '../store/quizzes.actions';
import { Observable } from 'rxjs';
import { selectPageQuizz } from '../store/quizzes.selectors';

@Component({
    selector: 'app-quizz-page',
    templateUrl: './quizz-page.component.pug',
    styleUrls: ['./quizz-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizzPageComponent implements OnInit {
    quizz$: Observable<Quizz>;

    constructor(
        private route: ActivatedRoute,
        private store: Store<AppState>
    ) { }

    ngOnInit() {
        this.store.dispatch(new QuizzPageRequested({quizzId: this.route.snapshot.params.id}));

        this.quizz$ = this.store.select(selectPageQuizz);
    }

    onSubmit(formValue: any) {
        console.log(formValue);
    }
}
