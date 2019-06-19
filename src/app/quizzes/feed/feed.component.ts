import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-feed',
    templateUrl: './feed.component.pug',
    styleUrls: ['./feed.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedComponent implements OnInit {

    testForm: FormGroup;

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.testForm = this.fb.group({
            name: ['', Validators.required],
            check: [true],
            select: ['v1']
        });
    }

    submit() {
        const values = this.testForm.value;
        console.log(values.name, values.check, values.select);
    }
}
