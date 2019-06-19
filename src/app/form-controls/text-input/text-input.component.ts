import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-text-input',
    templateUrl: './text-input.component.pug',
    styleUrls: ['./text-input.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TextInputComponent),
            multi: true
        }
    ]
})
export class TextInputComponent implements OnInit, ControlValueAccessor {

    @Input() value = '';
    @Input() label = '';
    @Input() id = '';
    @Input() placeholder = '';
    @Input() required: boolean;
    @Input() minLength = 2;
    @Input() maxlength = 255;
    @Input() pattern: string;

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
