import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkshopsFeedComponent } from './workshops-feed/workshops-feed.component';
import { WorkshopPageComponent } from './workshop-page/workshop-page.component';

const workshopsRoutes: Routes = [
    {
        path: '',
        redirectTo: 'feed',
        pathMatch: 'full'
    },
    {
        path: 'feed',
        component: WorkshopsFeedComponent
    },
    {
        path: 'feed/:id',
        component: WorkshopPageComponent
    }
];

@NgModule({
    imports: [ RouterModule.forChild(workshopsRoutes) ],
    exports: [ RouterModule ]
})
export class WorkshopsRoutingModule { }
