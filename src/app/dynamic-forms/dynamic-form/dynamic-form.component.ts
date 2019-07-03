import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-dynamic-form',
    templateUrl: './dynamic-form.component.pug',
    styleUrls: ['./dynamic-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormComponent implements OnInit {

    form: FormGroup;

    @Input() config: any[] = [];
    @Output() submitted: EventEmitter<any> = new EventEmitter();

    constructor(
        private fb: FormBuilder) { }

    ngOnInit() {
        this.form = this.createGroup();
    }

    createGroup(): FormGroup {
        const group = this.fb.group({});
        this.config.forEach(control => {
            if (control.name) {
                group.addControl(
                    control.name,
                    this.fb.control(
                        {
                            value: control.initialValue || '',
                            disabled: control.disabled
                        },
                        [Validators.required]
                    )
                );
            }
        });
        return group;
    }

    onSubmit(form: FormGroup) {
        if (form.valid) {
            this.submitted.emit(form.value);
        } else {
            Object.values(form.controls).forEach(control => {
                control.markAsTouched();
            });
        }
    }

}
