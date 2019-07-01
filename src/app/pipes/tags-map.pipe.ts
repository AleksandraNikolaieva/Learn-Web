import { Pipe, PipeTransform } from '@angular/core';
import { Dictionary } from '@ngrx/entity';
import { Tag } from '../shared/models';

@Pipe({
    name: 'tagsMap'
})
export class TagsMapPipe implements PipeTransform {

    transform(articleTags: Array<number>, tagsMap?: Dictionary<Tag>): Array<Tag> {
        return articleTags.map((id: number) => tagsMap[id]);
    }

}
