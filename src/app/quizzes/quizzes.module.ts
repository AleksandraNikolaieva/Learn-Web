import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './feed/feed.component';
import { QuizzesRoutingModule } from './quizzes-routing.module';

@NgModule({
    declarations: [FeedComponent],
    imports: [
        CommonModule,
        QuizzesRoutingModule
    ]
})
export class QuizzesModule { }
