import { Component, OnInit, forwardRef, Input, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.pug',
    styleUrls: ['./dropdown.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DropdownComponent),
            multi: true
        }
    ]
})
export class DropdownComponent implements OnInit, ControlValueAccessor {

    @Input() options: Array<string>;
    @Input() placeholder = 'Make your choice';
    @Input() label = '';
    @Input() id = '';
    @Input() toShow = '';
    @Input() toGet = '';
    @Input() size = 4;

    value: string;

    constructor() { }

    private propagateChange = (value: string) => {};
    private propagateTouched = ($event: FocusEvent) => {};

    ngOnInit() {}

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
}
