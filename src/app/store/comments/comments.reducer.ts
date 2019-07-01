import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { Comment } from 'src/app/workshops/models';
import { CommentsActions, CommentsActionTypes } from './comments.actions';

export const adapter: EntityAdapter<Comment> = createEntityAdapter<Comment>();

export interface CommentsState extends EntityState<Comment> {}

export const initialState: CommentsState = adapter.getInitialState({});

export function commentsReducer(state = initialState, action: CommentsActions): CommentsState {
    switch (action.type) {
        case CommentsActionTypes.CommentsReceived:
            return adapter.addAll(action.payload.comments, state);
        case CommentsActionTypes.CommentAdded:
            return adapter.addOne(action.payload.comment, state);
        case CommentsActionTypes.CommentDeleted:
            return adapter.removeOne(action.payload.id, state);
        case CommentsActionTypes.CommentModified:
            return adapter.updateOne(action.payload.comment, state);
        default:
            return state;
    }
}

export const {
    selectAll
} = adapter.getSelectors();
