import { Injectable } from '@angular/core';
import { Article } from '../workshops/models';
import { Tag } from '../shared/models';
import { of, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class WorkshopsService {

    constructor(private apiService: ApiService) { }

    public createPost(tags: Array<number>, title: string, text: string): Observable<Article> {
        const body = {
            tags,
            title,
            text
        };
        return this.apiService.postRequest('posts', body);
    }

    public getAllPosts(page = '1', tags?: string, authorId?: string, withComments = false): Observable<Array<Article>> {
        const comments  = withComments ? '1' : undefined;
        const params = {
            page,
            tags,
            authorId,
            withComments: comments
        };
        return this.apiService.getRequest('posts', params)
        .pipe(
            map(res => res.posts)
        );
    }

    public getPostById(id: string): Observable<Article> {
        return this.apiService.getRequest(`posts/${id}`);
    }

    public updetePost(
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

    public deletePost(id: string): Observable<Article> {
        return this.apiService.deleteRequest(`posts/${id}`);
    }
}
