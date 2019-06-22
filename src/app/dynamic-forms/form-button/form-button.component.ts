import { Component, OnInit } from '@angular/core';
import { Field, FieldConfig } from '../models';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-form-button',
    templateUrl: './form-button.component.pug',
    styleUrls: ['./form-button.component.scss']
})
export class FormButtonComponent implements OnInit, Field {
    group: FormGroup;
    config: FieldConfig;

    constructor() { }

    ngOnInit() {}

}
