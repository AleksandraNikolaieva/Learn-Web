import { FormGroup, ValidatorFn } from '@angular/forms';

export interface Field {
    group: FormGroup;
    config: FieldConfig;
}

export interface FieldConfig {
    label?: string;
    name: string;
    type: 'select' | 'input' | 'button' | 'checkbox';
    inputType?: string;
    placeholder?: string;
    options?: Array<string>;
    validations?: ValidatorFn[];
    disabled?: boolean;
    value?: any;
}
