import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Article } from '../workshops/models';
import { WorkshopsService } from '../services/workshops.service';

@Injectable({
    providedIn: 'root'
})
export class WorkshopsPageResolver implements Resolve<Observable<Article>> {

    constructor(private workshopsService: WorkshopsService) { }

    resolve(route: ActivatedRouteSnapshot, rsState: RouterStateSnapshot): Observable<Article> {
        return this.workshopsService.getArticle(route.params.id);
    }
}
