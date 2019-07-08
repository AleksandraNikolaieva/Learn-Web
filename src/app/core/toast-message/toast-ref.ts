import { OverlayRef } from '@angular/cdk/overlay';

export class ToastRef {
    constructor(
        private readonly overlay: OverlayRef
    ) { }

    close = (): void => this.overlay.dispose();

    isVisible = (): HTMLElement => this.overlay && this.overlay.overlayElement;

    getPosition = (): ClientRect | DOMRect => this.overlay.overlayElement.getBoundingClientRect();
}
