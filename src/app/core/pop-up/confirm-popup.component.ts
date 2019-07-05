import { Component, OnInit, Output, EventEmitter, Inject, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { PopupOverlayRef } from './popupOverlayRef';
import { PopupData } from 'src/app/core/pop-up/confirm-popup.service';
import { CONFIRM_POPUP_DATA } from './confirm-popup.token';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ESCAPE, ENTER } from '@angular/cdk/keycodes';

@Component({
    selector: 'app-pop-up',
    templateUrl: './confirm-popup.component.pug',
    styleUrls: ['./confirm-popup.component.scss'],
    animations: [
        trigger('confirmPopup', [
            state(
                'void',
                style({
                    transform:
                        'scale(0.8) translate3d(0,150px,0)',
                    opacity: 0
                })
            ),
            state(
                'enter',
                style({
                    transform: 'scale(1) translate3d(0,0,0)',
                    opacity: 1
                })
            ),
            transition('void=>enter', animate('300ms')),
            state(
                'leave',
                style({
                    transform:
                        'scale(0.8) translate3d(0,150px,0)',
                    opacity: 0
                })
            ),
            transition('enter=>leave', animate('150ms'))
        ])
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ConfirmPopupComponent implements OnInit, OnDestroy {
    animationState: 'void' | 'enter' | 'leave' = 'enter';
    animationStateChanged = new EventEmitter<AnimationEvent>();
    subscription: Subscription;

    @Output() confirmed = new EventEmitter<boolean | { confirmed: boolean; payload: any }>();

    constructor(
        private cdr: ChangeDetectorRef,
        public confirmPopupRef: PopupOverlayRef,
        @Inject(CONFIRM_POPUP_DATA) public data: PopupData
    ) { }

    ngOnInit() {
        this.subscription = this.confirmPopupRef.keyDownEvents$.subscribe(
            keyCode => {
                switch (keyCode) {
                    case ESCAPE:
                        this.cancel();
                        break;
                    case ENTER:
                        this.confirm();
                        break;
                }
            }
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    cancel() {
        this.confirmed.emit(false);
        this.confirmPopupRef.close();
    }

    confirm() {
        this.confirmed.emit(true);
        this.confirmPopupRef.close();
    }

    onAnimationStart(event: AnimationEvent) {
        this.animationStateChanged.emit(event);
    }

    onAnimationDone(event: AnimationEvent) {
        this.animationStateChanged.emit(event);
    }

    startExitAnimation() {
        this.animationState = 'leave';
        this.cdr.detectChanges();
    }
}
