import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Article } from '../workshops/models';
import { WorkshopsService } from '../services/workshops.service';
import { UsersService } from '../services/users.service';

@Injectable({
    providedIn: 'root'
})
export class WorkshopsPageResolver implements Resolve<Observable<Article>> {

    constructor(private workshopsService: WorkshopsService, private userService: UsersService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, rsState: RouterStateSnapshot): Observable<Article> {
        const res = this.workshopsService.getPostById(route.params.id)
        .pipe(
            tap(data => {
                if (!data) {
                    this.router.navigate(['not_found']);
                }
            }),
            map(article => {
                article.author = this.userService.getUserById(article._author)
                .pipe(
                    map(user => `${user.firstName} ${user.lastName}`)
                );
                return article;
            })
        );
        return res;
    }
}
