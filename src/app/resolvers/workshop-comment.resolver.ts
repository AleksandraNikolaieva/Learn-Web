import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CommentsService } from '../services/comments.service';
import { map } from 'rxjs/operators';
import { UsersService } from '../services/users.service';
import { Comment } from '../workshops/models';

@Injectable({
  providedIn: 'root'
})
export class WorkshopCommentResolver {

    constructor(
        private commentsService: CommentsService,
        private userService: UsersService,
        private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, rsState: RouterStateSnapshot): Observable<Array<Comment>> {
        return this.commentsService.getCommentsByPostId(route.parent.parent.params.id)
        .pipe(
            map(commentsArr => commentsArr.map(commentItem => {
                commentItem.author$ = this.userService.getUserById(commentItem._author);
                return commentItem;
            }))
        );
    }
}
