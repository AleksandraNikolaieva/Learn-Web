import { Directive, Renderer2, ElementRef, Input, AfterViewInit, OnDestroy } from '@angular/core';

@Directive({
    selector: '[appMultipleColor]'
})
export class MultipleColorDirective implements AfterViewInit, OnDestroy{

    constructor(
        private renderer: Renderer2,
        private elr: ElementRef
    ) {}
    removers: Array<() => void> = [];

    @Input() colors = ['#ffc266', '#FF8C64', '#FF665A', '#7D6B7D', '#A3A1A8'];
    @Input() property = 'background-color';
    @Input() saveAfterHover = false;

    ngAfterViewInit(): void {
        this.removers.push(this.renderer.listen(this.elr.nativeElement, 'mouseenter', this.changeColor));
        if (!this.saveAfterHover) {
            this.removers.push(this.renderer.listen(this.elr.nativeElement, 'mouseleave', this.backColor));
        }
    }

    ngOnDestroy(): void {
        this.removers.forEach((element: () => void) => {
            element();
        });
    }

    getColor(): string {
        const index = Math.floor(Math.random() * this.colors.length);
        return this.colors[index];
    }

    changeColor = () => {
        this.renderer.setStyle(this.elr.nativeElement, this.property, this.getColor());
    }

    backColor = () => {
        this.renderer.removeStyle(this.elr.nativeElement, this.property);
    }
}
