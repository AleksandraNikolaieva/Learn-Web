import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkshopsFeedComponent } from './workshops-feed/workshops-feed.component';
import { WorkshopPageComponent } from './workshop-page/workshop-page.component';
import { AuthGuard } from '../guards/auth.guard';
import { WorkshopsFeedResolver } from '../resolvers/workshops-feed.resolver';
import { WorkshopsPageResolver } from '../resolvers/workshops-page.resolver';
import { WorkshopCommentsComponent } from './workshop-comments/workshop-comments.component';
import { WorkshopQuizzesComponent } from './workshop-quizzes/workshop-quizzes.component';
import { WorkshopResourcesComponent } from './workshop-resources/workshop-resources.component';
import { AuxiliaryContentComponent } from '../shared/auxiliary-content/auxiliary-content.component';
import { TagsResolver } from '../resolvers/tags.resolver';
import { UsersResolver } from '../resolvers/users.resolver';
import { WorkshopCommentResolver } from '../resolvers/workshop-comment.resolver';

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
            workshops: WorkshopsFeedResolver,
            tags: TagsResolver
        }
    },
    {
        path: ':id',
        component: WorkshopPageComponent,
        canActivate: [AuthGuard],
        resolve: {
            workshop: WorkshopsPageResolver,
            tags: TagsResolver
        },
        children: [
            {
                path: 'workshop',
                component: AuxiliaryContentComponent,
                data: { tabs: ['comments', 'resources', 'quizzes']},
                outlet: 'aside',
                children: [
                    {
                        path: '',
                        redirectTo: 'comments',
                        pathMatch: 'full'
                    },
                    {
                        path: 'comments',
                        component: WorkshopCommentsComponent,
                        resolve: {
                            comments: WorkshopCommentResolver
                        }
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
