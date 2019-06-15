import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { Article } from '../workshops/models';
import { User } from '../core/models';
import { AuthService } from './auth.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {
    private user: User;
    private activeCategory$: BehaviorSubject<string> = new BehaviorSubject(null);

    constructor(private authService: AuthService) {
        this.authService.getLoggedUserObs().subscribe(res => {
            this.user = res;
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
