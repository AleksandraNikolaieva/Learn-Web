import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { enterRightPosition } from 'src/app/common/animations';

@Component({
    selector: 'app-feed',
    templateUrl: './feed.component.pug',
    styleUrls: ['./feed.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [enterRightPosition]
})
export class FeedComponent implements OnInit {
    isButtonPlus = true;

    constructor() { }

    ngOnInit() {
    }

    changeButton() {
        this.isButtonPlus = !this.isButtonPlus;
    }
}
