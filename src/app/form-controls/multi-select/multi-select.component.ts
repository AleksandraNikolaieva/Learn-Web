import { Component, OnInit, Input, forwardRef, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

@Component({
    selector: 'app-multi-select',
    templateUrl: './multi-select.component.pug',
    styleUrls: ['./multi-select.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MultiSelectComponent),
            multi: true
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiSelectComponent implements OnInit, ControlValueAccessor, OnDestroy {
    @Input() options$: Observable<Array<any>>;
    @Input() placeholder = 'Make your choice';
    @Input() label = '';
    @Input() id = '';
    @Input() toShow = '';
    @Input() toGet = '';

    value: Array<string> = null;
    options: Array<any>;
    entities: Map<string, any>;
    selectedArray: Array<string> = [];
    subscription: Subscription;

    constructor(private cdr: ChangeDetectorRef) { }

    private propagateChange = (value: Array<string>) => {};
    private propagateTouched = ($event: FocusEvent) => {};

    ngOnInit(): void {
        this.subscription = this.options$.subscribe(res => {
            this.options = res;
            this.entities = new Map(this.options.map((i): [string, any] => [i[this.toGet], i]));
            if (this.selectedArray.length) {
                this.options = this.options.filter(option => !this.selectedArray.some(item => item === option.seq));
            }
            this.cdr.detectChanges();
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    writeValue(value: Array<string> | null): void {
        if (value) {
            this.value = value;
            this.selectedArray = value;
            this.options = this.options.filter(option => !this.selectedArray.some(item => item === option.seq));
            this.cdr.detectChanges();
        }
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.propagateTouched = fn;
    }

    onChange(value: string): void {
        this.selectedArray.push(value);
        this.options = this.options.filter(item => item[this.toGet] !== value);
        this.propagateChange(this.selectedArray);
    }

    removeItem(value: string): void {
        this.selectedArray = this.selectedArray.filter(item => item !== value);
        this.options.push(this.entities.get(value));
        this.propagateChange(this.selectedArray);
    }
}
