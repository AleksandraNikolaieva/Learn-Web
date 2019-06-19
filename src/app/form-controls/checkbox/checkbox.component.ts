import { Component, OnInit, forwardRef, Input } from '@angular/core';
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

    @Input() checked = false;
    @Input() label = '';

    constructor() { }
    private propagateChange = (value: boolean) => {};
    private propagateTouched = ($event: FocusEvent) => {};

    ngOnInit() {
    }

    writeValue(value: boolean) {
        this.checked = value;
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any) {
        this.propagateTouched = fn;
    }

    onChange(value: boolean) {
        this.propagateChange(value);
    }
}
