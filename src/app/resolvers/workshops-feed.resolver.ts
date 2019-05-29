import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { WorkshopsService } from '../services/workshops.service';
import { Article } from '../workshops/models';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WorkshopsFeedResolver implements Resolve<Observable<Array<Article>>> {

    constructor(private workshopsService: WorkshopsService) { }

    resolve(): Observable<Array<Article>> {
        return this.workshopsService.getArticles();
    }
}
