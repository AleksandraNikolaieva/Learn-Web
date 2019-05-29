import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkshopPageComponent } from './workshop-page/workshop-page.component';
import { WorkshopsFeedComponent } from './workshops-feed/workshops-feed.component';
import { ArticleComponent } from './article/article.component';
import { WorkshopsRoutingModule } from './workshops-routing.module';
import { SharedModule } from '../shared/shared.module';
import { WorkshopResourcesComponent } from './workshop-resources/workshop-resources.component';
import { WorkshopQuizzesComponent } from './workshop-quizzes/workshop-quizzes.component';
import { WorkshopCommentsComponent } from './workshop-comments/workshop-comments.component';

@NgModule({
    declarations: [
        WorkshopPageComponent,
        WorkshopsFeedComponent,
        ArticleComponent,
        WorkshopResourcesComponent,
        WorkshopQuizzesComponent,
        WorkshopCommentsComponent
    ],
    imports: [
        CommonModule,
        WorkshopsRoutingModule,
        SharedModule
    ]
})
export class WorkshopsModule { }
