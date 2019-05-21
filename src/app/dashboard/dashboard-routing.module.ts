import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatisticComponent } from './statistic/statistic.component';

const dashboardRoutes: Routes = [
    {
        path: '',
        component: StatisticComponent
    }
];

@NgModule({
    imports: [ RouterModule.forChild(dashboardRoutes) ],
    exports: [ RouterModule ]
})
export class DashboardRoutingModule { }
