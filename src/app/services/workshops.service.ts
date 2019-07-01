import { Injectable } from '@angular/core';
import { Article, WorkshopsFeedParams } from '../workshops/models';
import { Observable, BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class WorkshopsService {

    private storedWS$: BehaviorSubject<Array<Article>> = new BehaviorSubject(null);

    constructor(private apiService: ApiService) { }

    createPost(tags: Array<number>, title: string, text: string): Observable<Article> {
        const body = {
            tags,
            title,
            text
        };
        return this.apiService.postRequest('posts', body);
    }

    getAllPosts(params: WorkshopsFeedParams): Observable<Array<Article>> {
        return this.apiService.getRequest('posts', params)
        .pipe(
            map(res => res.posts)
        );
    }

    getPostById(id: string): Observable<Article> {
        return this.apiService.getRequest(`posts/${id}`);
    }

    updetePost(
        id: string,
        tags: Array<number>,
        title: string,
        description: string,
        text: string,
        image: string,
        likes: Array<any>,
        stars: Array<any>,
        uni: Array<any>,
        comments: Array<Comment>
    ): Observable<Article> {
        const body = {
            tags,
            title,
            description,
            text,
            image,
            likes,
            stars,
            uni,
            comments
        };
        return this.apiService.putRequest(`posts/${id}`, body)
        .pipe(
            map(res => res.post)
        );
    }

    deletePost(id: string): Observable<Article> {
        return this.apiService.deleteRequest(`posts/${id}`);
    }

    getStoredWs(): Observable<Array<Article>> {
        return this.storedWS$.asObservable();
    }

    setStoredWS(workshops: Array<Article>): void {
        this.storedWS$.next(workshops);
    }
}
