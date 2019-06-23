import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../models';

@Component({
    selector: 'app-form-select',
    templateUrl: './form-select.component.pug',
    styleUrls: ['./form-select.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormSelectComponent implements OnInit {
    group: FormGroup;
    config: FieldConfig;

    constructor() { }

    ngOnInit() {
    }

}
