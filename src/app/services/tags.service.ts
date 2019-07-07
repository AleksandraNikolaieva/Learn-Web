import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Tag } from '../shared/models';
import { tap, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TagsService {

    private activeTags$: BehaviorSubject<Array<string>> = new BehaviorSubject(null);

    constructor(private api: ApiService) { }

    getAllTags(): Observable<Array<Tag>> {
        return this.api.getRequest('tags/all');
    }

    getMyTags(): Observable<Array<Tag>> {
        return this.api.getRequest('tags/my');
    }

    getTagById(id: number): Observable<Tag> {
        return this.api.getRequest(`tags/${id}`);
    }

    createTag(name: string): Observable<Tag> {
        return this.api.postRequest('tags', {name})
        .pipe(
            map(res => res.tag[0])
        );
    }

    deleteTagById(id: string): Observable<any> {
        return this.api.deleteRequest(`tags/${id}`);
    }

    getActiveTagsObs(): Observable<Array<string>> {
        return this.activeTags$.asObservable();
    }

    setActiveTags(tags: Array<string>): void {
        this.activeTags$.next(tags);
    }
}
