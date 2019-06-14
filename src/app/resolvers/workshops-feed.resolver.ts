import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { WorkshopsService } from '../services/workshops.service';
import { Article } from '../workshops/models';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users.service';
import { switchMap, tap, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class WorkshopsFeedResolver implements Resolve<Observable<Array<Article>>> {

    constructor(private workshopsService: WorkshopsService, private userService: UsersService) { }

    resolve(): Observable<Array<Article>> {
        return this.workshopsService.getAllPosts()
        .pipe(
            map(articles => articles.map(article => {
                article.author = this.userService.getUserById(article._author)
                .pipe(
                    map(user => `${user.firstName} ${user.lastName}`)
                );
                return article;
            }))
        );
    }
}
