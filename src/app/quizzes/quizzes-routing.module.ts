import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizzFeedComponent } from './quizz-feed/quizz-feed.component';
import { AuxiliaryContentComponent } from '../shared/auxiliary-content/auxiliary-content.component';
import { QuizzPageComponent } from './quizz-page/quizz-page.component';
import { ConstructorComponent } from './constructor/constructor.component';

const quizzesRoutes: Routes = [
    {
        path: '',
        redirectTo: 'feed',
        pathMatch: 'full'
    },
    {   path: 'feed',
        component: QuizzFeedComponent,
        children: [
            {
                path: 'constructor',
                outlet: 'aside',
                component: AuxiliaryContentComponent,
                children: [
                    {
                        path: '',
                        component: ConstructorComponent
                    }
                ]
            }
        ]
    },
    {
        path: ':id',
        component: QuizzPageComponent
    }
];

@NgModule({
    imports: [ RouterModule.forChild(quizzesRoutes) ],
    exports: [ RouterModule ]
})
export class QuizzesRoutingModule { }
