import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from './text-input/text-input.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { FormsModule } from '@angular/forms';
import { ErrorMessageComponent } from './error-message/error-message.component';

@NgModule({
    declarations: [
        TextInputComponent,
        CheckboxComponent,
        DropdownComponent,
        ErrorMessageComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        TextInputComponent,
        CheckboxComponent,
        DropdownComponent,
        ErrorMessageComponent
    ]
})
export class FormControlsModule { }
