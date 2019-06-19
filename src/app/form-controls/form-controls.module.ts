import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from './text-input/text-input.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        TextInputComponent,
        CheckboxComponent,
        DropdownComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        TextInputComponent,
        CheckboxComponent,
        DropdownComponent
    ]
})
export class FormControlsModule { }
