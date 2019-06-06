import { Directive, ElementRef, Input, HostBinding, Renderer2, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Colors } from '../../models';

@Directive({
    selector: '[appTextToColor]'
})
export class TextToColorDirective implements OnInit, AfterViewInit, OnDestroy {
    constructor(
        private renderer: Renderer2,
        private elr: ElementRef
    ) {}

    persent = 60;
    color: string;
    higlightenColor: string;
    removers: Array<Function> = [];

    @Input() colorMap: Colors = {
        tiny: '#FFC266',
        small: '#FF8C64',
        medium: '#FF665A',
        large: '#7D6B7D',
        huge: '#A3A1A8'
    };
    @Input() isLightenOnHover = false;

    @HostBinding('style.pointer-events') pointer = 'auto';
    @HostBinding('attr.disabled') isDisabled = false;

    @Input('appTextToColor') set str(str: string) {
        if (!this.isDisabled) {
            let res = 0;
            for (let i = 0; i < str.length; i++) {
                res += str.charCodeAt(i);
            }
            res = +(res / str.length).toFixed(2).split('.')[1];
            if (res < 20) {
                this.color = this.colorMap.tiny;
            } else if ( res < 40) {
                this.color = this.colorMap.small;
            } else if (res < 60) {
                this.color = this.colorMap.medium;
            } else if (res < 80) {
                this.color = this.colorMap.large;
            } else {
                this.color = this.colorMap.huge;
            }
            this.setBackground(this.color);
        }
    }
    @Input('disableElement') set disable(val: boolean) {
        if (val) {
            this.isDisabled = true;
            this.setBackground('grey');
            this.persent = 0;
            this.pointer = 'none';
        }
    }

    ngOnInit(): void {
        this.higlightenColor = this.isLightenOnHover ? this.getHoveredColor(this.color, 60) : this.getHoveredColor(this.color, -60);
    }

    ngAfterViewInit(): void {
        this.removers.push(this.renderer.listen(this.elr.nativeElement, 'mouseenter', this.highlight));
        this.removers.push(this.renderer.listen(this.elr.nativeElement, 'mouseleave', this.removeHighlight));
    }

    ngOnDestroy(): void {
        this.removers.forEach((item: () => void) => {
            item();
        });
    }

    setBackground(color: string) {
        this.renderer.setStyle(this.elr.nativeElement, 'background-color', color);
    }

    highlight = () => { this.setBackground(this.higlightenColor); };

    removeHighlight = () => { this.setBackground(this.color); };

    getHoveredColor(color: string, val: number): string {
        let usePound = false;
        if (color[0] === '#') {
            color = color.slice(1);
            usePound = true;
        }
        const num = parseInt(color, 16);

        let r = (num >> 16) + val;
        if (r > 255) {
            r = 255;
        } else if (r < 0) {
            r = 0;
        }

        let b = ((num >> 8) & 0x00FF) + val;
        if (b > 255) {
            b = 255;
        } else if (b < 0) {
            b = 0;
        }

        let g = (num & 0x0000FF) + val;
        if (g > 255) {
            g = 255;
        } else if (g < 0) {
            g = 0;
        }

        return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
    }
}

