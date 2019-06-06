import { Directive, Input, OnInit, OnDestroy, TemplateRef, ViewContainerRef, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appCollapsable]'
})
export class CollapsableDirective implements OnInit, OnDestroy {

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private renderer: Renderer2
    ) { }

    isCollapsed: boolean;

    @Input('appCollapsable') height: string;
    @Input('appCollapsableDefState') set defState(val: 'on' | 'off') {
        if (val === 'on') {
            this.isCollapsed = true;
        } else {
            this.isCollapsed = false;
        }
    }
    @Input() enableAnimation: boolean;

    ngOnInit() {
        if (this.isCollapsed) {
            
        }
        const context = {
            controller: {
                next: () => this.collapse(),
                prev: () => this.expand()
              }
        };
        this.viewContainer.createEmbeddedView(this.templateRef, context);
    }

    ngOnDestroy() {

    }

    collapse() {

    }

    expand() {

    }
}
