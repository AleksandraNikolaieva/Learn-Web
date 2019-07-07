import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field, FieldConfig } from '../models';

@Component({
    selector: 'app-form-input',
    templateUrl: './form-input.component.pug',
    styleUrls: ['./form-input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormInputComponent implements OnInit, Field {
    group: FormGroup;
    config: FieldConfig;

    constructor() { }

    ngOnInit() {}

}
