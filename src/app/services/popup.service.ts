import { Injectable, InjectionToken, Injector, ComponentRef } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { PopUpComponent } from '../core/pop-up/pop-up.component';
import { Observable } from 'rxjs';
import { take, filter } from 'rxjs/operators';
import { PopupOverlayRef } from '../core/pop-up/popupOverlayRef';
import { CONFIRM_POPUP_DATA } from '../core/pop-up/pop-up.token';

export interface PopupData {
    title: string | null;
    message?: string | null;
    cancelButton?: string | null;
    confirmationButton?: string | null;
    component?: any;
    componentToken?: InjectionToken<any>;
    componentData?: any;
}

export interface PopupConfig  {
    panelClass?: string;
    hasBackdrop?: boolean;
    backdropClass?: string;
    data?: any;
}

const DEFAULT_CONFIRM_POPUP_CONFIG: PopupConfig = {
    panelClass: 'confirm-popup',
    hasBackdrop: true,
    backdropClass: 'confirm-popup_backdrop',
    data: {
        title: '',
        message: '',
        cancelButton: 'Cancel',
        confirmationButton: 'Confirm'
    }
};

@Injectable({
    providedIn: 'root'
})
export class PopupService {

    constructor(private injector: Injector, private overlay: Overlay) { }

    confirm(params): Observable<boolean | { confirmed: boolean; payload: any }> {
        const popup = this.open({ data: { ...params } });

        return popup.confirmed
        .pipe(
            take(1),
            filter(confirmed => !!confirmed)
        );
    }

    private getPopupOverlayConfig(config: PopupConfig): OverlayConfig {
        const scrollStrategy = this.overlay.scrollStrategies.block();
        const positionStrategy = this.overlay
            .position()
            .global()
            .centerHorizontally()
            .centerVertically();

        return new OverlayConfig({
            hasBackdrop: config.hasBackdrop,
            backdropClass: config.backdropClass,
            panelClass: config.panelClass,
            scrollStrategy,
            positionStrategy
        });
    }

    private createPopupOverlay(config: PopupConfig) {
        const overlayConfig = this.getPopupOverlayConfig(config);
        return this.overlay.create(overlayConfig);
    }

    private createPopupInjector(config: PopupConfig, confirmPopupRef: PopupOverlayRef): PortalInjector {
        const injectionTokens = new WeakMap();
        injectionTokens.set(PopupOverlayRef, confirmPopupRef);
        injectionTokens.set(CONFIRM_POPUP_DATA, config.data);

        return new PortalInjector(this.injector, injectionTokens);
    }

    private attachPopupContainer(
        overlayRef: OverlayRef,
        config: PopupConfig,
        confirmPopupRef: PopupOverlayRef
    ) {
        const injector = this.createPopupInjector(config, confirmPopupRef);
        const containerPortal = new ComponentPortal(PopUpComponent, null, injector);
        const containerRef: ComponentRef<PopUpComponent> = overlayRef.attach(containerPortal);

        containerRef.changeDetectorRef.detectChanges();

        return containerRef.instance;
    }

    open(config: PopupConfig = {}) {
        const popupConfig = {
            ...DEFAULT_CONFIRM_POPUP_CONFIG,
            ...config
        };
        const overlayRef = this.createPopupOverlay(popupConfig);
        const confirmPopupRef = new PopupOverlayRef(overlayRef);

        popupConfig.data = {
            ...DEFAULT_CONFIRM_POPUP_CONFIG.data,
            ...(config.data ? config.data : {})
        };

        const componentInstance = this.attachPopupContainer(
            overlayRef,
            popupConfig,
            confirmPopupRef
        );

        confirmPopupRef.componentInstance = componentInstance;

        const subscription = overlayRef.backdropClick().subscribe(() => {
            componentInstance.cancel();
            subscription.unsubscribe();
        });

        return componentInstance;
    }
}
