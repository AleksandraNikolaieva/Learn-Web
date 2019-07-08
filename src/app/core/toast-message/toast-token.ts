import { InjectionToken, TemplateRef } from '@angular/core';

export class ToastData {
    type: ToastType;
    text?: string;
}

export type ToastType = 'error' | 'info' | 'success';

export interface ToastConfig {
    position?: {
        top: number;
        right: number;
    };
    animation?: {
        fadeOut: number;
        fadeIn: number;
    };
}

export const defaultToastConfig: ToastConfig = {
    position: {
        top: 90,
        right: 10,
    },
    animation: {
        fadeOut: 2500,
        fadeIn: 300,
    },
};

export const TOAST_CONFIG_TOKEN = new InjectionToken('toast-config');
