import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { TagComponent } from './tag/tag.component';
import { UserPicComponent } from './user-pic/user-pic.component';
import { TimestampComponent } from './timestamp/timestamp.component';
import { ToTopButtonComponent } from './to-top-button/to-top-button.component';
import { TabGroupComponent } from './tab-group/tab-group.component';
import { TabComponent } from './tab/tab.component';
import { CommentComponent } from './comment/comment.component';
import { LikeComponent } from './like/like.component';
import { EditAddCommentComponent } from './edit-add-comment/edit-add-comment.component';
import { AuxiliaryContentComponent } from './auxiliary-content/auxiliary-content.component';
import { ViewportComponent } from './viewport/viewport.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        ViewportComponent,
        CardComponent,
        TagComponent,
        UserPicComponent,
        TimestampComponent,
        ToTopButtonComponent,
        TabGroupComponent,
        TabComponent,
        CommentComponent,
        LikeComponent,
        EditAddCommentComponent,
        AuxiliaryContentComponent,
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        ViewportComponent,
        CardComponent,
        TagComponent,
        UserPicComponent,
        TimestampComponent,
        ToTopButtonComponent,
        TabGroupComponent,
        TabComponent,
        CommentComponent,
        LikeComponent,
        EditAddCommentComponent
    ]
})
export class SharedModule { }
