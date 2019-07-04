import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterEvent, NavigationEnd } from '@angular/router';
import { enterRightPosition } from 'src/app/common/animations';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-viewport',
    templateUrl: './viewport.component.pug',
    styleUrls: ['./viewport.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [enterRightPosition]
})
export class ViewportComponent implements OnInit, OnDestroy {
    isButtonPlus: boolean;
    subscription: Subscription;
    @Input() link: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private cdr: ChangeDetectorRef) { }

    ngOnInit() {
        this.setAuxiliaryStatus();

        this.subscription = this.router.events.pipe(
            filter((event: RouterEvent) => event instanceof NavigationEnd)
        ).subscribe(() => {
            this.setAuxiliaryStatus();
            this.cdr.detectChanges();
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
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
