import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-dynamic-form',
    templateUrl: './dynamic-form.component.pug',
    styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {

    form: FormGroup;

    @Input() config: any[] = [];
    @Output() submitted: EventEmitter<any> = new EventEmitter();

    constructor(
        private fb: FormBuilder,
        private cdr: ChangeDetectorRef) { }

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
                        }
                    )
                );
            }
        });
        return group;
    }

    onSubmit(form: FormGroup) {
        if (form.valid) {
            this.submitted.emit(form.value);
        }
    }

}
