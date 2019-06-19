import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from './text-input/text-input.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { DropdownComponent } from './dropdown/dropdown.component';

@NgModule({
    declarations: [
        TextInputComponent,
        CheckboxComponent,
        DropdownComponent
    ],
    imports: [
        CommonModule
    ]
})
export class FormControlsModule { }
