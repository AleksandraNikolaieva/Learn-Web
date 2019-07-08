import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkshopPageComponent } from './workshop-page/workshop-page.component';
import { WorkshopsFeedComponent } from './workshops-feed/workshops-feed.component';
import { ArticleComponent } from './article/article.component';
import { WorkshopsRoutingModule } from './workshops-routing.module';
import { SharedModule } from '../shared/shared.module';
import { WorkshopQuizzesComponent } from './workshop-quizzes/workshop-quizzes.component';
import { WorkshopCommentsComponent } from './workshop-comments/workshop-comments.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { workshopsReducer } from './store/workshops.reducer';
import { WorkshopsEffects } from './store/workshops.effects';
import { tagsReducer } from '../store/tags/tags.reducer';
import { TagsEffects } from '../store/tags/tags.effects';
import { usersReducer } from '../store/users/users.reducer';
import { UsersEffects } from '../store/users/users.effects';
import { commentsReducer } from '../store/comments/comments.reducer';
import { CommentsEffects } from '../store/comments/comments.effects';
import { WsTopPaneComponent } from './ws-top-pane/ws-top-pane.component';
import { WsFormComponent } from './ws-form/ws-form.component';
import { FormControlsModule } from '../form-controls/form-controls.module';

@NgModule({
    declarations: [
        WorkshopPageComponent,
        WorkshopsFeedComponent,
        ArticleComponent,
        WorkshopQuizzesComponent,
        WorkshopCommentsComponent,
        WsTopPaneComponent,
        WsFormComponent
    ],
    imports: [
        CommonModule,
        WorkshopsRoutingModule,
        SharedModule,
        FormControlsModule,

        StoreModule.forFeature('workshops', workshopsReducer),
        EffectsModule.forFeature([WorkshopsEffects]),
        StoreModule.forFeature('tags', tagsReducer),
        EffectsModule.forFeature([TagsEffects]),
        StoreModule.forFeature('users', usersReducer),
        EffectsModule.forFeature([UsersEffects]),
        StoreModule.forFeature('comments', commentsReducer),
        EffectsModule.forFeature([CommentsEffects])
    ]
})
export class WorkshopsModule { }
