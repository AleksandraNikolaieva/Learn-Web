import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkshopsFeedComponent } from './workshops-feed/workshops-feed.component';
import { WorkshopPageComponent } from './workshop-page/workshop-page.component';
import { AuthGuard } from '../guards/auth.guard';
import { WorkshopsFeedResolver } from '../resolvers/workshops-feed.resolver';
import { WorkshopsPageResolver } from '../resolvers/workshops-page.service';
import { WorkshopCommentsComponent } from "./workshop-comments/workshop-comments.component";
import { WorkshopQuizzesComponent } from "./workshop-quizzes/workshop-quizzes.component";
import { WorkshopResourcesComponent } from "./workshop-resources/workshop-resources.component";

const workshopsRoutes: Routes = [
    {
        path: '',
        redirectTo: 'feed',
        pathMatch: 'full'
    },
    {
        path: 'feed',
        component: WorkshopsFeedComponent,
        canActivate: [AuthGuard],
        resolve: {
            workshops: WorkshopsFeedResolver
        }
    },
    {
        path: ':id',
        component: WorkshopPageComponent,
        canActivate: [AuthGuard],
        resolve: {
            workshop: WorkshopsPageResolver
        },
        children: [
            {
                path: '',
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
