import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './feed/feed.component';
import { QuizzesRoutingModule } from './quizzes-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [FeedComponent],
    imports: [
        CommonModule,
        QuizzesRoutingModule,
        SharedModule
    ]
})
export class QuizzesModule { }
