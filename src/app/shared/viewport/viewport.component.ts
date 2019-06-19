import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { enterRightPosition } from 'src/app/common/animations';

@Component({
    selector: 'app-viewport',
    templateUrl: './viewport.component.pug',
    styleUrls: ['./viewport.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [enterRightPosition]
})
export class ViewportComponent implements OnInit {
    isButtonPlus: boolean;
    @Input() link: string;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.setAuxiliaryStatus();
    }

    setAuxiliaryStatus() {
        if (this.route.children.length) {
            this.isButtonPlus = false;
        } else {
            this.isButtonPlus = true;
        }
    }

    changeButton() {
        this.isButtonPlus = !this.isButtonPlus;
    }
}
