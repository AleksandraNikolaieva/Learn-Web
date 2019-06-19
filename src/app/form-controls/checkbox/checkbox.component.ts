import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, CheckboxControlValueAccessor, ControlValueAccessor } from '@angular/forms';

@Component({
    selector: 'app-checkbox',
    templateUrl: './checkbox.component.pug',
    styleUrls: ['./checkbox.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CheckboxComponent),
            multi: true
        }
    ]
})
export class CheckboxComponent implements OnInit, ControlValueAccessor {

    constructor() { }

    ngOnInit() {
    }

    writeValue() {

    }

    registerOnChange() {

    }

    registerOnTouched() {

    }
}
