import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './feed/feed.component';

const quizzesdRoutes: Routes = [
    {
        path: '',
        redirectTo: 'feed',
        pathMatch: 'full'
    },
    {
        path: 'feed',
        component: FeedComponent
    }
];

@NgModule({
    imports: [ RouterModule.forChild(quizzesdRoutes) ],
    exports: [ RouterModule ]
})
export class QuizzesRoutingModule { }
