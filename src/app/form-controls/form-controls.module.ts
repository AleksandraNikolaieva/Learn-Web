import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from './text-input/text-input.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { FormsModule } from '@angular/forms';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { TextareaComponent } from './textarea/textarea.component';

@NgModule({
    declarations: [
        TextInputComponent,
        CheckboxComponent,
        DropdownComponent,
        ErrorMessageComponent,
        TextareaComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        TextInputComponent,
        CheckboxComponent,
        DropdownComponent,
        ErrorMessageComponent,
        TextareaComponent
    ]
})
export class FormControlsModule { }
