import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { FieldConfig } from 'src/app/dynamic-forms/models';
import { QuizzesService } from 'src/app/services/quizzes.service';

@Component({
    selector: 'app-constructor',
    templateUrl: './constructor.component.pug',
    styleUrls: ['./constructor.component.scss']
})
export class ConstructorComponent implements OnInit {
    quizzForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private quizzService: QuizzesService) { }

    ngOnInit(): void {
        this.quizzForm = this.fb.group({
            name: [null, [Validators.required, Validators.minLength(2)]],
            questions: new FormArray([])
        });
    }

    onSubmit(): void {
        const res = this.quizzForm.value;
        console.log(res);
        res.author = '5d02b67d1169ca285e4aa13a'; // for mock quizz
        res.date = new Date();                   // for mock quizz
        this.quizzService.addMockQuizz(res);

    }

    addQuestion(): void {
        (this.quizzForm.get('questions') as FormArray).push(
            new FormGroup({
                question: new FormControl(null),
                questionType: new FormControl(null),
                correctAnswer: new FormControl(null),
                answerVariants: new FormArray([])
            })
        );
    }

    addAnswerVariant(index: number): void {
        const question = (this.quizzForm.get('questions') as FormArray).at(index);
        (question.get('answerVariants') as FormArray).push(
            new FormGroup({
                answer: new FormControl(null),
                isCorrect: new FormControl(false)
            })
        );
    }

    deleteQuestion(index: number): void {
        (this.quizzForm.get('questions') as FormArray).removeAt(index);
    }

    deleteAnswerVariant(indexQuestion: number, indexVariant: number): void {
        console.log(indexVariant);
        const question = (this.quizzForm.get('questions') as FormArray).at(indexQuestion);
        (question.get('answerVariants') as FormArray).removeAt(indexVariant);
    }
}
