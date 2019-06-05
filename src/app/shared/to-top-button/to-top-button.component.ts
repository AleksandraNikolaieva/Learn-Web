import { Component, OnInit, Input, ChangeDetectionStrategy, Renderer2, ChangeDetectorRef, OnDestroy, NgZone } from '@angular/core';

@Component({
    selector: 'app-to-top-button',
    templateUrl: './to-top-button.component.pug',
    styleUrls: ['./to-top-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToTopButtonComponent implements OnInit, OnDestroy {
    @Input() hostElement: HTMLElement;
    isVisible = false;
    listener: Function;
    constructor(
        private renderer: Renderer2,
        private cdr: ChangeDetectorRef,
        private ngZone: NgZone) { }

    ngOnInit() {
        const heightForVisibleButton = 20;
        this.ngZone.runOutsideAngular(() => {
            this.listener = this.renderer.listen(this.hostElement, 'scroll', () => {
                if (this.hostElement.scrollTop > heightForVisibleButton) {
                    this.isVisible = true;
                    this.cdr.detectChanges();
                } else {
                    this.isVisible = false;
                    this.cdr.detectChanges();
                }
            });
        });
    }

    goToTop(): void {
        this.hostElement.scrollTo({left: 0, top: 0, behavior: 'smooth'});
        this.isVisible = false;
    }

    ngOnDestroy(): void {
        this.listener();
    }
}
