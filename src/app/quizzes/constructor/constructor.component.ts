import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ValidatorFn, FormControl } from '@angular/forms';
import { QuizzesService } from 'src/app/services/quizzes.service';
import { QuestionVariant } from '../models';
import { AppState } from 'src/app/store/reducers';
import { Store } from '@ngrx/store';
import { QuizzAddRequested } from '../store/quizzes.actions';
import { Article, WorkshopsFeedParams } from 'src/app/workshops/models';
import { WorkshopsRequested } from 'src/app/workshops/store/workshops.actions';
import { Observable } from 'rxjs';
import { selectWorkshops } from 'src/app/workshops/store/workshops.selectors';
import { selectAuthData } from 'src/app/auth/store/auth.selectors';

@Component({
    selector: 'app-constructor',
    templateUrl: './constructor.component.pug',
    styleUrls: ['./constructor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConstructorComponent implements OnInit {
    quizzForm: FormGroup;
    workshops$: Observable<Array<Article>>;

    constructor(
        private fb: FormBuilder,
        private store: Store<AppState>
    ) { }

    ngOnInit(): void {
        this.store.select(selectAuthData).subscribe(res => {
            if (res._id) {
                this.store.dispatch(new WorkshopsRequested({params: new WorkshopsFeedParams(undefined, undefined, res._id)}));
            }
        });
        this.workshops$ = this.store.select(selectWorkshops);

        this.quizzForm = this.fb.group({
            name: [null, [Validators.required, Validators.minLength(2)]],
            posts: [null, Validators.required],
            questions: this.fb.array([], this.arrLengthValidation(1))
        });
    }

    onSubmit(): void {
        if (this.quizzForm.invalid) {
            this.showErrors(this.quizzForm);
            return;
        }
        const res = this.quizzForm.value;
        this.store.dispatch(new QuizzAddRequested({quizz: res}));
        this.quizzForm.reset();
        this.quizzForm.setControl('posts', new FormControl(null, Validators.required));
        this.quizzForm.setControl('questions', this.fb.array([], this.arrLengthValidation(1)));
    }

    showErrors(formgroup: FormGroup) {
        Object.values(formgroup.controls).forEach(control => {
            control.markAsTouched();

            if (control instanceof FormArray) {
                (control.controls as Array<FormGroup>).forEach(controlItem => {
                    this.showErrors(controlItem);
                });
            }
        });
    }

    addQuestion(): void {
        (this.quizzForm.get('questions') as FormArray).push(
            this.fb.group({
                question: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
                questionType: ['input', Validators.required],
                correctAnswer: [null, Validators.required]
            })
        );
    }

    addAnswerVariant(index: number): void {
        const question = ((this.quizzForm.get('questions') as FormArray).at(index) as FormGroup);
        question.removeControl('correctAnswer');
        question.addControl('answerVariants', this.fb.array([], [this.arrLengthValidation(2), this.isCorrectAnswerSelected()]));
        (question.get('answerVariants') as FormArray).push(
            this.fb.group({
                answer: [null, Validators.required],
                isCorrect: [false]
            })
        );
    }

    deleteQuestion(index: number): void {
        (this.quizzForm.get('questions') as FormArray).removeAt(index);
    }

    deleteAnswerVariant(indexQuestion: number, indexVariant: number): void {
        const question = (this.quizzForm.get('questions') as FormArray).at(indexQuestion);
        (question.get('answerVariants') as FormArray).removeAt(indexVariant);
    }

    private arrLengthValidation(min: number): ValidatorFn {
        return (arr: FormArray): { [key: string]: {minLength: number, actualLength: number} } => {
            if (arr.length >= min) {
                return null;
            }
            return {
                arrLength: {minLength: min, actualLength: arr.length}
            };
        };
    }

    private isCorrectAnswerSelected(): ValidatorFn {
        return (arr: FormArray): { [key: string]: boolean } => {
            let markedAnswers = 0;
            arr.value.forEach((variant: QuestionVariant) => {
                if (variant.isCorrect) {
                    markedAnswers++;
                }
            });

            if (markedAnswers > 0) {
                return null;
            }
            return {
                answerChoice: true
            };
        };
    }
}
