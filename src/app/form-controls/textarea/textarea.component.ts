import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
    selector: 'app-textarea',
    templateUrl: './textarea.component.pug',
    styleUrls: ['./textarea.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TextareaComponent),
            multi: true
        }
    ]
})
export class TextareaComponent implements OnInit, ControlValueAccessor {
    @Input() id = '';
    @Input() placeholder = '';
    @Input() label = '';
    @Input() cols = 20;
    @Input() rows = 5;

    value: string;

    constructor() { }

    private propagateChange = (value: string) => {};
    private propagateTouched = ($event: FocusEvent) => {};

    ngOnInit() {
    }

    writeValue(value: string): void {
        this.value = value;
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.propagateTouched = fn;
    }

    onChange(value: string): void {
        this.propagateChange(value);
    }

    onBlur($event: FocusEvent): void {
        this.propagateTouched($event);
    }

}
