import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { Article } from '../workshops/models';
import { User } from '../core/models';
import { AuthService } from './auth.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { AppState } from '../store/reducers';
import { Store, select } from '@ngrx/store';
import { selectAuthData } from '../auth/store/auth.selectors';
import { AuthData } from '../auth/models';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {
    private user: User;
    private activeCategory$: BehaviorSubject<string> = new BehaviorSubject(null);
    private subscription: Subscription;

    constructor(
        private authService: AuthService,
        private store: Store<AppState>
    ) {
        this.subscription = this.store.pipe(
            select(selectAuthData)
        ).subscribe((authData: AuthData) => {
            this.user = authData;
        });
    }

    filterByCategory(category: string, articles: Array<Article>): Array<Article> {
        if (category !== 'all') {
            let filteredArticles = [];
            if (category === 'my') {
                filteredArticles = articles.filter(article => article._author === this.user._id);
            } else if (category === 'favorite') {
                filteredArticles = articles.filter(article => article.likes.some(userId => userId === this.user._id));
            }
            return filteredArticles;
        } else {
            return articles;
        }
    }

    getActiveCategory(): Observable<string> {
        return this.activeCategory$.asObservable();
    }

    setActiveCategory(category: string): void {
        this.activeCategory$.next(category);
    }
}
