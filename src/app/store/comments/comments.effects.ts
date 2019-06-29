import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { CommentsService } from 'src/app/services/comments.service';

@Injectable()
export class CommentsEffects {

    constructor(
        private actions$: Actions,
        private commentsService: CommentsService
    ) { }

}
