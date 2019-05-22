import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { User } from 'src/app/core/models';

@Component({
    selector: 'app-user-pic',
    templateUrl: './user-pic.component.pug',
    styleUrls: ['./user-pic.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserPicComponent implements OnInit {
    @Input() user: User;
    initials: string;
    constructor() { }

    ngOnInit() {
        this.getInitials();
    }

    private getInitials(): void {
        const name = this.user.name.split(' ');
        this.initials = name[0][0] + name[1][0];
    }
}
