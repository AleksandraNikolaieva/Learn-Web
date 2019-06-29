import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { Tag } from 'src/app/shared/models';
import { TagsActionTypes, TagsActions } from './tags.actions';

export function selectTagSeq(a: Tag): number {
    return a.seq;
}

export const adapter: EntityAdapter<Tag> = createEntityAdapter<Tag>({selectId: selectTagSeq});

export interface TagsState extends EntityState<Tag> {
    activeTags: string | null;
}

export const initialState: TagsState = adapter.getInitialState({
    activeTags: null
});

export function tagsReducer(state = initialState, action: TagsActions): TagsState {
    switch (action.type) {

        case TagsActionTypes.TagsReceived:
            return adapter.addAll(action.payload.tags, state);
        case TagsActionTypes.TagsActivated:
            return {...state, activeTags : action.payload.tags};
        default:
            return state;
    }
}

export const {
    selectAll,
    selectEntities
} = adapter.getSelectors();
