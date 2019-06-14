import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { User } from 'src/app/core/models';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-user-pic',
    templateUrl: './user-pic.component.pug',
    styleUrls: ['./user-pic.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserPicComponent implements OnInit {
    @Input() user: Observable<User>;
    initials = '';
    userToShow: User;
    constructor(private cdr: ChangeDetectorRef) { }

    ngOnInit() {
        this.user.subscribe(user => {
            this.userToShow = user;
            if (user.firstName) {
                this.initials += user.firstName[0];
            }
            if (user.lastName) {
                this.initials += user.lastName[0];
            }
            this.cdr.detectChanges();
        });
    }
}
