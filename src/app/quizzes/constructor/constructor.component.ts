import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { FieldConfig } from 'src/app/dynamic-forms/models';
import { QuizzesService } from 'src/app/services/quizzes.service';
import { QuestionVariant } from '../models';

@Component({
    selector: 'app-constructor',
    templateUrl: './constructor.component.pug',
    styleUrls: ['./constructor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConstructorComponent implements OnInit {
    quizzForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private quizzService: QuizzesService) { }

    ngOnInit(): void {
        this.quizzForm = this.fb.group({
            name: [null, [Validators.required, Validators.minLength(2)]],
            questions: this.fb.array([], this.arrLengthValidation(1))
        });
    }

    onSubmit(): void {
        const res = this.quizzForm.value;
        console.log(res);
        res.author = '5d02b67d1169ca285e4aa13a'; // for mock quizz
        res.date = new Date();                   // for mock quizz
        this.quizzService.addMockQuizz(res);
        this.quizzForm.reset();
        this.quizzForm.setControl('questions', this.fb.array([], this.arrLengthValidation(1)));
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
        question.addControl('answerVariants', this.fb.array([], [this.arrLengthValidation(2), this.isCorrectAnswerChoosed()]));
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
        return (arr: FormArray): { [key: string]: boolean } => {
            if (arr.length >= min) {
                return null;
            }
            return {
                isLengthValid: false
            };
        };
    }

    private isCorrectAnswerChoosed(): ValidatorFn {
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
                isChoosed: false
            };
        };
    }
}
