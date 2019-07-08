import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { AnimationEvent } from '@angular/animations';

import {
    AnimationTriggerMetadata,
    trigger,
    state,
    transition,
    style,
    animate,
} from '@angular/animations';
import { ToastRef } from './toast-ref';
import { TOAST_CONFIG_TOKEN, ToastConfig, ToastData } from './toast-token';

export const toastAnimations: {
    readonly fadeToast: AnimationTriggerMetadata;
} = {
    fadeToast: trigger('fadeAnimation', [
        state('default', style({ opacity: 1 })),
        transition('void => *', [style({ opacity: 0 }), animate('{{ fadeIn }}ms')]),
        transition(
            'default => closing',
            animate('{{ fadeOut }}ms', style({ opacity: 0 })),
        ),
    ]),
};

export type ToastAnimationState = 'default' | 'closing';

@Component({
    selector: 'app-toast-message',
    templateUrl: './toast-message.component.pug',
    styleUrls: ['./toast-message.component.scss'],
    animations: [toastAnimations.fadeToast],
  })
export class ToastMessageComponent implements OnInit, OnDestroy {
    animationState: ToastAnimationState = 'default';
    intervalId: any;

    constructor(
        readonly data: ToastData,
        readonly ref: ToastRef,
        @Inject(TOAST_CONFIG_TOKEN) public toastConfig: ToastConfig
    ) {}

    ngOnInit(): void {
        this.intervalId = setTimeout((): string => {
            return this.animationState = 'closing';
        }, 5000);
    }

    ngOnDestroy(): void {
        clearTimeout(this.intervalId);
    }

    close(): void {
        this.ref.close();
    }

    onFadeFinished(event: AnimationEvent): void {
        const { toState } = event;
        const isFadeOut = (toState as ToastAnimationState) === 'closing';
        const itFinished = this.animationState === 'closing';

        if (isFadeOut && itFinished) {
            this.close();
        }
    }
}
