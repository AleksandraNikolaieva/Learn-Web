import { Injectable, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Comment } from '../workshops/models';
import { map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CommentsService {

    constructor(private api: ApiService) { }

    public createComment(post: string, text: string): Observable<Comment> {
        const body = {
            post,
            text
        };
        return this.api.postRequest(`comments/${post}`, body)
        .pipe(
            map(res => res.comment)
        );

    }

    public getCommentsByPostId(id: string): Observable<Array<Comment>> {
        return this.api.getRequest(`comments/${id}`);
    }

    public updateComment(postId: string, commentId: string, text: string): Observable<Comment> {
        const body = {
            text
        };
        return this.api.putRequest(`comments/${postId}/${commentId}`, body)
        .pipe(
            map(res => res.comment)
        );
    }

    public deleteComment(postId: string, commentId: string): Observable<any> {
        return this.api.deleteRequest(`comments/${postId}/${commentId}`);
    }
}
