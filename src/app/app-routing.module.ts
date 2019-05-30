import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'workshops',
        pathMatch: 'full'
    },
    {
        path: 'workshops',
        loadChildren: './workshops/workshops.module#WorkshopsModule',
        canLoad: [AuthGuard]
    },
    {
        path: 'quizzes',
        loadChildren: './quizzes/quizzes.module#QuizzesModule'
    },
    {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'not_found',
        component: NotFoundComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
