import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './feed/feed.component';

const quizzesRoutes: Routes = [
    {
        path: '',
        component: FeedComponent
    }
];

@NgModule({
    imports: [ RouterModule.forChild(quizzesRoutes) ],
    exports: [ RouterModule ]
})
export class QuizzesRoutingModule { }
