import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './feed/feed.component';
import { QuizzesRoutingModule } from './quizzes-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormControlsModule } from '../form-controls/form-controls.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormsModule } from '../dynamic-forms/dynamic-forms.module';
import { QuizzPageComponent } from './quizz-page/quizz-page.component';
import { QuizzConfigPipe } from '../pipes/quizz-config.pipe';
import { QuizzCardComponent } from './quizz-card/quizz-card.component';
import { ConstructorComponent } from './constructor/constructor.component';

@NgModule({
    declarations: [
        FeedComponent,
        QuizzPageComponent,
        QuizzCardComponent,
        ConstructorComponent
    ],
    imports: [
        CommonModule,
        QuizzesRoutingModule,
        SharedModule,
        FormControlsModule,
        DynamicFormsModule
    ]
})
export class QuizzesModule { }
