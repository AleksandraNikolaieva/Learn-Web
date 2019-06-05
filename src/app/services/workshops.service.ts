import { Injectable } from '@angular/core';
import { Article, Tag } from '../workshops/models';
import { of, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { articlesArr } from './mockData';

@Injectable({
    providedIn: 'root'
})
export class WorkshopsService {
    articles: Array<Article> = articlesArr;

    constructor(private authService: AuthService) { }

    public getArticles(): Observable<Array<Article>> {
        return of(this.articles);
    }

    public getArticleById(id: number): Observable<Article> {
        return of(this.articles.find((article: Article) => article.id === +id));
    }

    public getFilteredArticles(tags?: string, category?: string): Array<Article> {
        let res: Array<Article>;
        if (tags) {
            res = this.getArticlesByTags(tags.split(','));
        }
        if (category) {
            res = this.getArticlesByCategory(category, res);
        }
        return res;
    }

    private getArticlesByTags(tags: Array<string>, searchIn?: Array<Article>): Array<Article> {
        if (searchIn) {
            return searchIn.filter((article: Article) => article.tags.some((tag: string)  => tags.includes(tag)));
        }
        return this.articles.filter((article: Article) => article.tags.some(tag => tags.includes(tag)));
    }

    private getArticlesByCategory(category: string, searchIn?: Array<Article>): Array<Article> {
        let toFilter: Array<Article>;
        if (searchIn) {
            toFilter = searchIn;
        } else {
            toFilter = this.articles;
        }

        if (category === 'my') {
            return toFilter.filter(article => article.author.id === this.authService.getLoggedUser().id);
        } else if (category === 'favorite') {
            return toFilter.filter(article => article.isFavorite === true);
        } else {
            return toFilter;
        }
    }
}
