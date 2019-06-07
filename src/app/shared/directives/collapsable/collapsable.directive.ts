import { Directive, Input, OnInit, TemplateRef, ViewContainerRef, Renderer2 } from '@angular/core';
import { AnimationBuilder, AnimationFactory, style, animate, AnimationPlayer } from '@angular/animations';

@Directive({
    selector: '[appCollapsable]'
})
export class CollapsableDirective implements OnInit {

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private renderer: Renderer2,
        private animationBuilder: AnimationBuilder
    ) { }

    collapseAnimation: AnimationFactory;
    expandAnimation: AnimationFactory;
    isCollapsed: boolean;
    player: AnimationPlayer;
    element: HTMLElement;
    context = {
        title: '',
        control: () => this.toggle()
    };

    @Input('appCollapsable') height: string;
    @Input('appCollapsableEnableAnimation') enableAnimation: boolean;

    @Input('appCollapsableState') set defState(state: 'on' | 'off') {
        if (state === 'on') {
            this.isCollapsed = true;
            this.context.title = 'Show more';
        } else {
            this.isCollapsed = false;
            this.context.title = 'Show less';
        }
    }

    ngOnInit() {
        const cv = this.viewContainer.createEmbeddedView(this.templateRef, this.context);
        console.log(cv);
        this.element = cv.rootNodes[0].childNodes[1];
        console.log(this.element);

        this.collapseAnimation = this.animationBuilder.build([
            style({
                'overflow-y': 'hidden',
                height: '*'
            }),
            animate(
                '250ms ease-in',
                style({
                    height: this.height
                })
            )
        ]);

        this.expandAnimation = this.animationBuilder.build([
            style({
                'overflow-y': 'hidden',
                height: this.height
            }),
            animate(
                '250ms ease-out',
                style({
                    height: '*'
                })
            )
        ]);

        if (this.isCollapsed) {
            this.renderer.setStyle(this.element, 'height', this.height);
            this.renderer.setStyle(this.element, 'overflow', 'hidden');
        }
    }

    toggle() {
        this.isCollapsed = !this.isCollapsed;
        this.context.title = this.isCollapsed ? 'Show more' : 'Show less';
        if (this.enableAnimation) {
            this.withAnimation();
        } else {
            this.withoutAnimation();
        }
    }

    withAnimation(): void {
        this.renderer.removeStyle(this.element, 'height');
        if (this.player) {
            this.player.destroy();
        }
        if (this.isCollapsed) {
            this.player = this.collapseAnimation.create(this.element);
            this.player.play();
        } else {
            this.player = this.expandAnimation.create(this.element);
            this.player.play();
        }
    }

    withoutAnimation() {
        if (this.isCollapsed) {
            this.renderer.setStyle(this.element, 'height', this.height);
        } else {
            this.renderer.removeStyle(this.element, 'height');
        }
    }
}
