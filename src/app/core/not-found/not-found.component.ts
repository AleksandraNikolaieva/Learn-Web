import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, NgZone, AfterViewInit } from '@angular/core';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.pug',
    styleUrls: ['./not-found.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent implements OnInit, AfterViewInit {
    error = '';

    constructor(private cdr: ChangeDetectorRef, private ngZone: NgZone) { }

    ngOnInit() {
    }

    ngAfterViewInit(): void {
        const toShow = '404, page not found.';
        let i = 0;
        this.ngZone.runOutsideAngular(() => {
            const interval = setInterval(() => {
                this.error += toShow[i];
                this.cdr.detectChanges();
                i++;
                if (i === toShow.length) {
                    clearInterval(interval);
                }
            }, 200);
        });
    }
}
