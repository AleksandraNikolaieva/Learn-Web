import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizzFeedComponent } from './quizz-feed/quizz-feed.component';
import { QuizzesRoutingModule } from './quizzes-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormControlsModule } from '../form-controls/form-controls.module';
import { DynamicFormsModule } from '../dynamic-forms/dynamic-forms.module';
import { QuizzPageComponent } from './quizz-page/quizz-page.component';
import { QuizzCardComponent } from './quizz-card/quizz-card.component';
import { ConstructorComponent } from './constructor/constructor.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { QuizzesEffects } from './store/quizzes.effects';
import { quizzesReducer } from './store/quizzes.reducer';
import { usersReducer } from '../store/users/users.reducer';
import { UsersEffects } from '../store/users/users.effects';
import { workshopsReducer } from '../workshops/store/workshops.reducer';
import { WorkshopsEffects } from '../workshops/store/workshops.effects';

@NgModule({
    declarations: [
        QuizzFeedComponent,
        QuizzPageComponent,
        QuizzCardComponent,
        ConstructorComponent
    ],
    imports: [
        CommonModule,
        QuizzesRoutingModule,
        SharedModule,
        FormControlsModule,
        DynamicFormsModule,

        StoreModule.forFeature('quizzes', quizzesReducer),
        EffectsModule.forFeature([QuizzesEffects]),
        StoreModule.forFeature('users', usersReducer),
        EffectsModule.forFeature([UsersEffects]),
        StoreModule.forFeature('workshops', workshopsReducer),
        EffectsModule.forFeature([WorkshopsEffects]),
    ]
})
export class QuizzesModule { }
