import { Component, OnInit, forwardRef, Input, Renderer2, ViewChild, ElementRef } from '@angular/core';
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

    disabled = false;
    value = '';

    @Input() label = '';
    @Input() id = '';
    @Input() placeholder = '';
    @Input() inputType = 'text';

    @ViewChild('input') input: ElementRef;

    constructor(private renderer: Renderer2) { }

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

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this.renderer.setProperty(this.input.nativeElement, 'disabled', isDisabled);
    }

    onChange(value: string): void {
        this.propagateChange(value);
    }

    onBlur($event: FocusEvent): void {
        this.propagateTouched($event);
    }
}
