import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkshopsFeedComponent } from './workshops-feed/workshops-feed.component';
import { WorkshopPageComponent } from './workshop-page/workshop-page.component';
import { AuthGuard } from '../guards/auth.guard';
import { WorkshopCommentsComponent } from './workshop-comments/workshop-comments.component';
import { WorkshopQuizzesComponent } from './workshop-quizzes/workshop-quizzes.component';
import { WorkshopResourcesComponent } from './workshop-resources/workshop-resources.component';
import { AuxiliaryContentComponent } from '../shared/auxiliary-content/auxiliary-content.component';
import { WsFormComponent } from './ws-form/ws-form.component';

const workshopsRoutes: Routes = [
    {
        path: '',
        redirectTo: 'feed',
        pathMatch: 'full'
    },
    {
        path: 'feed',
        component: WorkshopsFeedComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'create',
        component: WsFormComponent,
        canActivate: [AuthGuard],
        data: {title: 'New workshop:', action: 'add'}
    },
    {
        path: ':id/edit',
        component: WsFormComponent,
        canActivate: [AuthGuard],
        data: {title: 'Edit workshop', action: 'edit'}
    },
    {
        path: ':id',
        component: WorkshopPageComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'workshop',
                component: AuxiliaryContentComponent,
                data: { tabs: ['comments', 'quizzes']},
                outlet: 'aside',
                children: [
                    {
                        path: '',
                        redirectTo: 'comments',
                        pathMatch: 'full'
                    },
                    {
                        path: 'comments',
                        component: WorkshopCommentsComponent
                    },
                    {
                        path: 'resources',
                        component: WorkshopResourcesComponent
                    },
                    {
                        path: 'quizzes',
                        component: WorkshopQuizzesComponent
                    }
                ]
            }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(workshopsRoutes) ],
    exports: [ RouterModule ]
})
export class WorkshopsRoutingModule { }
