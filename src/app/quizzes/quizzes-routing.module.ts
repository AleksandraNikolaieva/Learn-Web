import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './feed/feed.component';
import { AuxiliaryContentComponent } from '../shared/auxiliary-content/auxiliary-content.component';

const quizzesRoutes: Routes = [
    {
        path: '',
        redirectTo: 'feed',
        pathMatch: 'full'
    },
    {   path: 'feed',
        component: FeedComponent,
        children: [
            {
                path: 'constructor',
                outlet: 'aside',
                component: AuxiliaryContentComponent
            }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(quizzesRoutes) ],
    exports: [ RouterModule ]
})
export class QuizzesRoutingModule { }
