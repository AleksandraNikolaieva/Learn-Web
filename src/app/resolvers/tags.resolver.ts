import { Injectable } from '@angular/core';
import { ActivatedRoute, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Tag } from '../shared/models';
import { TagsService } from '../services/tags.service';

@Injectable({
    providedIn: 'root'
})
export class TagsResolver implements Resolve<Observable<Array<Tag>>> {

    constructor( private tagService: TagsService) { }

    resolve() {
        return this.tagService.getAllTags();
    }
}
