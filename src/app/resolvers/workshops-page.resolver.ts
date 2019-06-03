import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Article } from '../workshops/models';
import { WorkshopsService } from '../services/workshops.service';

@Injectable({
    providedIn: 'root'
})
export class WorkshopsPageResolver implements Resolve<Observable<Article>> {

    constructor(private workshopsService: WorkshopsService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, rsState: RouterStateSnapshot): Observable<Article> {
        const res = this.workshopsService.getArticleById(route.params.id);
        res.subscribe(data => {
            if (!data) {
                this.router.navigate(['not_found']);
            }
        });
        return res;
    }
}
