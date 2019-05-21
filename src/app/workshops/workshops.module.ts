import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkshopPageComponent } from './workshop-page/workshop-page.component';
import { WorkshopsFeedComponent } from './workshops-feed/workshops-feed.component';
import { ArticleComponent } from './article/article.component';
import { WorkshopsRoutingModule } from './workshops-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        WorkshopPageComponent,
        WorkshopsFeedComponent,
        ArticleComponent
    ],
    imports: [
        CommonModule,
        WorkshopsRoutingModule,
        SharedModule
    ]
})
export class WorkshopsModule { }
