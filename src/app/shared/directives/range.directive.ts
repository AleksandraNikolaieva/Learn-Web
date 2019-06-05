import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';
// used to show is Quizzes

@Directive({
    selector: '[appRange]'
})
export class RangeDirective {

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef
    ) { }

    @Input('appRange') set range(range: Array<number> | number) {
        let from;
        let to;
        if (typeof range === 'object') {
            from = range[0];
            to = range[1];
        } else {
            from = 0;
            to = range[0];
        }
        this.viewContainer.clear();
        let counter = 0;
        for (let i = from; i <= to; i++) {
            this.viewContainer.createEmbeddedView(this.templateRef, {
                index: counter,
                number: i
            });
            counter++;
        }
    }
}
