import { Component, OnInit } from '@angular/core';
import { Quizz } from '../models';
import { ActivatedRoute } from '@angular/router';
import { quizzes } from '../data';

@Component({
    selector: 'app-quizz-page',
    templateUrl: './quizz-page.component.pug',
    styleUrls: ['./quizz-page.component.scss']
})
export class QuizzPageComponent implements OnInit {
    quizz: Quizz;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe(data => {
            this.quizz = quizzes[data.id - 1];
        });
    }

    onSubmit(formValue: any) {
        console.log(formValue);
    }
}
