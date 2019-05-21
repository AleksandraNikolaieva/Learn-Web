import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/core/models';

@Component({
    selector: 'app-user-pic',
    templateUrl: './user-pic.component.pug',
    styleUrls: ['./user-pic.component.scss']
})
export class UserPicComponent implements OnInit {
    @Input() user: User;
    initials: string;
    constructor() { }

    ngOnInit() {
    }

    getInitials() {
        const name = this.user.name.split(' ');
        this.initials = name[0][1] + [1][1];
    }

}
