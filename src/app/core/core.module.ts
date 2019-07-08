import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { TopPaneComponent } from './top-pane/top-pane.component';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { ConfirmPopupComponent } from './pop-up/confirm-popup.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { ToastMessageComponent } from './toast-message/toast-message.component';
import { defaultToastConfig, TOAST_CONFIG_TOKEN } from './toast-message/toast-token';

@NgModule({
    declarations: [
        SideMenuComponent,
        TopPaneComponent,
        NotFoundComponent,
        ConfirmPopupComponent,
        ToastMessageComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        OverlayModule,
        PortalModule
    ],
    exports: [
        TopPaneComponent,
        SideMenuComponent,
        NotFoundComponent
    ],
    entryComponents: [ConfirmPopupComponent, ToastMessageComponent]
})
export class CoreModule {
    public static forRoot(configToast = defaultToastConfig): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                {
                    provide: TOAST_CONFIG_TOKEN,
                    useValue: { ...defaultToastConfig, ...configToast }
                }
            ],
        };
    }
}
