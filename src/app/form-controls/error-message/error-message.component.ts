import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-error-message',
    templateUrl: './error-message.component.pug',
    styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent implements OnInit {

    @Input() field: FormControl;
    errorsConfig: any = {
        required: 'Field is required',
        answerChoice: `The correct answer is not selected`
    };

    constructor() { }

    ngOnInit() {
    }

    get errors() {
        const errors: Array<string> = [];
        if (!this.field || !this.field.errors) {
            return null;
        }
        if (this.field.errors.hasOwnProperty('minlength')) {
            this.errorsConfig.minlength = `Minimun length is ${this.field.errors.minlength.requiredLength}`;
        }
        if (this.field.errors.hasOwnProperty('maxlength')) {
            this.errorsConfig.maxlength = `Maximum length is ${this.field.errors.maxlength.requiredLength}`;
        }
        if (this.field.errors.hasOwnProperty('arrLength')) {
            this.errorsConfig.arrLength = `Should be at least ${this.field.errors.arrLength.minLength} items`;
        }
        if (this.field.errors) {
            Object.keys(this.field.errors).forEach(errType => {
                errors.push(this.errorsConfig[errType]);
            });
        }
        return errors;
    }
}
