import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkshopsFeedComponent } from './workshops-feed/workshops-feed.component';
import { WorkshopPageComponent } from './workshop-page/workshop-page.component';
import { AuthGuard } from '../guards/auth.guard';
import { WorkshopsFeedResolver } from '../resolvers/workshops-feed.resolver';
import { WorkshopsPageResolver } from '../resolvers/workshops-page.service';

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
        }
    }
];

@NgModule({
    imports: [ RouterModule.forChild(workshopsRoutes) ],
    exports: [ RouterModule ]
})
export class WorkshopsRoutingModule { }
