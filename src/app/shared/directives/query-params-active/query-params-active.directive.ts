import { Directive, Input, OnInit, Renderer2, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Directive({
    selector: '[appQueryParamsActive]'
})
export class QueryParamsActiveDirective implements OnInit, OnDestroy {
    @Input() class = 'active';
    @Input('appQueryParamsActive') qpName: string;
    @Input() find: string;
    subscription: Subscription;
    constructor(
        private route: ActivatedRoute,
        private renderer: Renderer2,
        private elem: ElementRef) {}

    ngOnInit(): void {
        this.subscription = this.route.queryParamMap.subscribe(queryParam => {
            const qp = queryParam.get(this.qpName);
            if (qp) {
                const isExist = qp.split(',').some(item => item === this.find);
                if (isExist) {
                    this.renderer.addClass(this.elem.nativeElement, this.class);
                } else {
                    this.renderer.removeClass(this.elem.nativeElement, this.class);
                }
            } else {
                this.renderer.removeClass(this.elem.nativeElement, this.class);
            }
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
