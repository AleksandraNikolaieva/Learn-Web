import { Injectable } from '@angular/core';
import { Article, WorkshopsFeedParams, WorkshopData } from '../workshops/models';
import { Observable, BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class WorkshopsService {

    private storedWS$: BehaviorSubject<Array<Article>> = new BehaviorSubject(null);

    constructor(private apiService: ApiService) { }

    createPost(workshopData: WorkshopData): Observable<Article> {
        return this.apiService.postRequest('posts', workshopData)
        .pipe(
            map(res => res.post)
        );
    }

    getAllPosts(params: WorkshopsFeedParams): Observable<Array<Article>> {
        return this.apiService.getRequest('posts', params)
    }

    getPostById(id: string): Observable<Article> {
        return this.apiService.getRequest(`posts/${id}`);
    }

    updetePost(id: string, workshopData: WorkshopData): Observable<Article> {
        return this.apiService.putRequest(`posts/${id}`, workshopData)
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

    getMyFavoritePosts(myId: string) {
        this.apiService.getRequest(`reactions/getpostids/${myId}/likes`);
    }
}
