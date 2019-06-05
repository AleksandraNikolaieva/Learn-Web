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
    listener;
    constructor(
        private renderer: Renderer2,
        private cdr: ChangeDetectorRef,
        private ngZone: NgZone) { }

    ngOnInit() {
        const heightForVisibleButton = 20;
        const debouncedScroll = this.debounce(() => {
            if (this.hostElement.scrollTop > heightForVisibleButton) {
                this.isVisible = true;
                this.cdr.detectChanges();
            } else {
                this.isVisible = false;
                this.cdr.detectChanges();
            }
        }, 500);
        this.ngZone.runOutsideAngular(() => { // extra prevention from changeDetection, can be removed if all components use onPush
            this.listener = this.renderer.listen(this.hostElement, 'scroll', debouncedScroll);
        });
    }

    debounce(func: () => void, wait: number) {
        let timeout: NodeJS.Timer;
        return function() {
            const context = this;
            const args = arguments;
            const later = () => {
                timeout = null;
                func.apply(context, args);
            };
            const callNow = !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) {
                func.apply(context, args);
            }
        };
    }

    goToTop(): void {
        this.hostElement.scrollTo({left: 0, top: 0, behavior: 'smooth'});
        this.isVisible = false;
    }

    ngOnDestroy(): void {
        this.listener();
    }
}
