import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { Article } from '../workshops/models';
import { User } from '../core/models';
import { AppState } from '../store/reducers';
import { Store, select } from '@ngrx/store';
import { selectAuthData } from '../auth/store/auth.selectors';
import { AuthData } from '../auth/models';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {
    private loggedUser: User;

    constructor(private store: Store<AppState>) {
        this.store.pipe(
            select(selectAuthData)
        ).subscribe((authData: AuthData) => {
            this.loggedUser = authData;
        });
    }

    filterByCategory(category: string, articles: Array<Article>): Array<Article> {
        if (category !== 'all') {
            let filteredArticles = [];
            if (category === 'my') {
                filteredArticles = articles.filter(article => article.author === this.loggedUser._id);
            } else if (category === 'favorite') {
                filteredArticles = articles.filter(article => article.reactionsAutors.likes.some(userId => userId === this.loggedUser._id));
            }
            return filteredArticles;
        } else {
            return articles;
        }
    }
}
