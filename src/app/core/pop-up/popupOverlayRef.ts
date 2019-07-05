import { Subject, Observable } from 'rxjs';
import { ConfirmPopupComponent } from './confirm-popup.component';
import { OverlayRef } from '@angular/cdk/overlay';
import { map, filter, take } from 'rxjs/operators';
import { ESCAPE, ENTER } from '@angular/cdk/keycodes';

export class PopupOverlayRef {
    private _beforeClose = new Subject<void>();
    private _afterClosed = new Subject<void>();

    componentInstance: ConfirmPopupComponent;

    get overlayRef(): OverlayRef {
        return this._overlayRef;
    }

    keyDownEvents$: Observable<number> = this._overlayRef.keydownEvents().pipe(
        map((event: KeyboardEvent) => event.keyCode),
        filter((keyCode: number) => keyCode === ESCAPE || keyCode === ENTER)
    );

    constructor(private _overlayRef: OverlayRef) {}

    close(): void {
        this.componentInstance.animationStateChanged
            .pipe(
                filter((event: any) => event.phaseName === 'start'),
                take(1)
            )
            .subscribe(() => {
                this._beforeClose.next();
                this._beforeClose.complete();
                this.overlayRef.detachBackdrop();
            });

        this.componentInstance.animationStateChanged
            .pipe(
                filter(
                    (event: any) =>
                        event.phaseName === 'done' && event.toState === 'leave'
                ),
                take(1)
            )
            .subscribe(() => {
                this.overlayRef.dispose();
                this._afterClosed.next();
                this._afterClosed.complete();
                this.componentInstance = null;
            });

        this.componentInstance.startExitAnimation();
    }

    afterClosed(): Observable<void> {
        return this._afterClosed.asObservable();
    }

    beforeClosed(): Observable<void> {
        return this._beforeClose.asObservable();
    }
}
