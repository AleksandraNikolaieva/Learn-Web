import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { User } from 'src/app/core/models';
import { Observable, Subscription } from 'rxjs';
import { Dictionary } from '@ngrx/entity';

@Component({
    selector: 'app-user-pic',
    templateUrl: './user-pic.component.pug',
    styleUrls: ['./user-pic.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserPicComponent implements OnInit {
    @Input() user: User;
    initials = '';


    constructor(private cdr: ChangeDetectorRef) { }

    ngOnInit() {
        if (this.user.firstName) {
            this.initials += this.user.firstName[0];
        }
        if (this.user.lastName) {
            this.initials += this.user.lastName[0];
        }
        this.cdr.detectChanges();
    }
}
