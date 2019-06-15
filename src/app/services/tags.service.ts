import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Tag } from '../shared/models';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TagsService {

    private activeTags$ = new BehaviorSubject(null);

    constructor(private api: ApiService) { }

    public getAllTags(): Observable<Array<Tag>> {
        return this.api.getRequest('tags/all');
    }

    public getMyTags(): Observable<Array<Tag>> {
        return this.api.getRequest('tags/my');
    }

    public getTagById(id: number): Observable<Tag> {
        return this.api.getRequest(`tags/${id}`);
    }

    public createTag(name: string): Observable<Tag> {
        return this.api.postRequest('tags', {name});
    }

    public deleteTagById(id: string): Observable<any> {
        return this.api.deleteRequest(`tags/${id}`);
    }

    public getActiveTagsObs(): Observable<Array<string>> {
        return this.activeTags$.asObservable();
    }

    public setActiveTags(tags: Array<string>): void {
        this.activeTags$.next(tags);
    }
}
