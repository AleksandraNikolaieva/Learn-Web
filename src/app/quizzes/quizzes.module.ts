import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './feed/feed.component';
import { QuizzesRoutingModule } from './quizzes-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormControlsModule } from '../form-controls/form-controls.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [FeedComponent],
    imports: [
        CommonModule,
        QuizzesRoutingModule,
        SharedModule,
        FormControlsModule,
        ReactiveFormsModule
    ]
})
export class QuizzesModule { }
