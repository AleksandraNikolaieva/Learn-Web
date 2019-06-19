import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-feed',
    templateUrl: './feed.component.pug',
    styleUrls: ['./feed.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedComponent implements OnInit {
    isButtonPlus = true;
    testForm: FormGroup;

    constructor(private fb: FormBuilder, private route: ActivatedRoute) { }

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
