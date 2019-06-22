import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { FieldConfig } from 'src/app/dynamic-forms/models';

@Component({
    selector: 'app-constructor',
    templateUrl: './constructor.component.pug',
    styleUrls: ['./constructor.component.scss']
})
export class ConstructorComponent implements OnInit {
    quizzForm: FormGroup;

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.quizzForm = this.fb.group({
            quizzName: [null, [Validators.required, Validators.minLength(2)]],
            questions: new FormArray([])
        });
    }

    onSubmit() {
        const res = this.quizzForm.value;
        console.log(res);
    }

    addQuestion() {
        (this.quizzForm.get('questions') as FormArray).push(
            new FormGroup({
                questionName: new FormControl(null),
                questionType: new FormControl(null),
                correctAnswer: new FormControl(null),
                answerVariants: new FormArray([])
            })
        );
    }

    addAnswerVariant(index: number) {
        console.log('index', index);
        const question = (this.quizzForm.get('questions') as FormArray).at(index);
        (question.get('answerVariants') as FormArray).push(
            new FormGroup({
                answer: new FormControl(null),
                isCorrect: new FormControl(false)
            })
        );
    }
}
